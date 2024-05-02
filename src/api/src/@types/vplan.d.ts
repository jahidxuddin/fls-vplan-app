type Row = {
  class_name: string;
  school_name: string;
  position: string;
  teacher: string;
  subject: string;
  room: string;
  vteacher: string;
  vsubject: string;
  vroom: string;
  merkmal: string;
  info: string;
};

type Table = {
  rows: Row[];
};

type VPlanData = {
  edited: string;
  tables: Table[];
};
