import axios from "axios";
import { load } from "cheerio";

export default async function scrapeVPlan(): Promise<{
  [key: string]: RowData[];
} | null> {
  try {
    const response = await axios.get("https://www.fls-wiesbaden.de/vplan");
    const html = response.data;
    const $ = load(html);

    const data: { [key: string]: RowData[] } = {};
    let edited: string | null = null;

    const whitespacePattern = /\s+/g;

    $("p.stand").each((_index, el) => {
      edited = $(el).text().replace(whitespacePattern, " ").trim();
    });

    $(".vplan")
      .find("table")
      .each((_index, vplan) => {
        const dateMatch = $(vplan)
          .attr("summary")
          ?.match(/\d{2}\.\d{2}\.\d{4}/);
        const date = dateMatch ? dateMatch[0] : "Unknown";
        data[date] = [];

        let class_name = "";
        let school_name = "";

        $(vplan)
          .find("tr")
          .each((_index, tr) => {
            const td = $(tr).find("td");

            if ($(tr).hasClass("vplan_blank")) return;

            if ($(tr).hasClass("vplan_class_title")) {
              class_name = td
                .filter(".class_name")
                .text()
                .replace("Klasse: ", "")
                .trim()
                .replace(whitespacePattern, " ");
              school_name = td
                .filter(".school_name")
                .text()
                .trim()
                .replace(whitespacePattern, " ");
            } else {
              const rowData: RowData = {
                class_name: td
                  .eq(0)
                  .text()
                  .trim()
                  .replace(whitespacePattern, " "),
                school_name: td
                  .eq(1)
                  .text()
                  .trim()
                  .replace(whitespacePattern, " "),
                position: td
                  .eq(2)
                  .text()
                  .trim()
                  .replace(whitespacePattern, " "),
                teacher: td.eq(3).text().trim().replace(whitespacePattern, " "),
                subject: td.eq(4).text().trim().replace(whitespacePattern, " "),
                room: td.eq(5).text().trim().replace(whitespacePattern, " "),
                vteacher: td
                  .eq(6)
                  .text()
                  .trim()
                  .replace(whitespacePattern, " "),
                vsubject: td
                  .eq(7)
                  .text()
                  .trim()
                  .replace(whitespacePattern, " "),
                vroom: td.eq(8).text().trim().replace(whitespacePattern, " "),
                merkmal: td.eq(9).text().trim().replace(whitespacePattern, " "),
                info: td.eq(10).text().trim().replace(whitespacePattern, " "),
              };
              data[date].push(rowData);
            }
          });

        data[date].shift();
      });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
