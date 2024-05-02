import axios from "axios";
import { load } from "cheerio";

function scrapeLastEdited($: cheerio.Root, spacePattern: RegExp): string {
  let edited = "Unknown";
  $("p.stand").each((_index, el) => {
    edited = $(el)
      .text()
      .replace(spacePattern, " ")
      .match(/\s+(\d{2}.\d{2}.\d{4}),\s+(\d{2}:\d{2})\s+/)[0]
      .trim();
  });
  return edited;
}

export default async function scrapeVPlan(): Promise<VPlanData> {
  try {
    const res = await axios.get("https://www.fls-wiesbaden.de/vplan");
    const html = res.data;
    const $ = load(html);

    const whitespacePattern = /\s+/g;

    const data: VPlanData = {
      edited: scrapeLastEdited($, whitespacePattern),
      tables: [],
    };

    $(".vplan")
      .find("table")
      .each((_, vPlan) => {
        const dateMatch = $(vPlan)
          .attr("summary")
          ?.match(/\d{2}\.\d{2}\.\d{4}/);
        const date = dateMatch[0];
        data.tables[date] = {
          rows: [],
        };

        $(vPlan)
          .find("tr")
          .each((_index, tr) => {
            const td = $(tr).find("td");

            if ($(tr).hasClass("vplan_blank")) return;

            if ($(tr).hasClass("vplan_class_title")) return;

            const rowData: VPlanRow = {
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
              position: td.eq(2).text().trim().replace(whitespacePattern, " "),
              teacher: td.eq(3).text().trim().replace(whitespacePattern, " "),
              subject: td.eq(4).text().trim().replace(whitespacePattern, " "),
              room: td.eq(5).text().trim().replace(whitespacePattern, " "),
              vteacher: td.eq(6).text().trim().replace(whitespacePattern, " "),
              vsubject: td.eq(7).text().trim().replace(whitespacePattern, " "),
              vroom: td.eq(8).text().trim().replace(whitespacePattern, " "),
              merkmal: td.eq(9).text().trim().replace(whitespacePattern, " "),
              info: td.eq(10).text().trim().replace(whitespacePattern, " "),
            };

            data.tables[date].rows.push(rowData);
          });

        data.tables[date].rows.shift();
      });

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}
