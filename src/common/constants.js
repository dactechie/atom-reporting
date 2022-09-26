export const APPLICATION_MODE_NORMAL = 0;
export const APPLICATION_MODE_ADMIN = 1;

export const APP_ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT || "prod";

// export const APP_AZSLOT = process.env.VUE_APP_AZSLOT || "prod";

// export const SURVEY_IDS =
//   process.env.VUE_APP_SURVEYIDS_INAS_ITSP || "unknownids";

export const PARTITION_KEY = "PartitionKey";
export const ROW_KEY = "RowKey";

export const MODE_EMPTY_CLIENT_DATA = 0;
export const MODE_CLIENT_DATA_SET = 1; // show client survey history

export const DB_ENTITY_NAME = "COMS";

export const MILLIS_IN_DAY = 86_400_000; // 24 * 60 * 60 * 1000
export const MILLIS_IN_YEAR = 31_536_000_000; // 365 * MILLIS_IN_DAY

export const DB_META_KEYS = [
  PARTITION_KEY,
  ROW_KEY,
  "ClientID",
  "SourceDatabase",
  "Program",
  "Staff",
  "SurveyName",
  "Status",
  "SurveyID"
];
