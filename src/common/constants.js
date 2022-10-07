export const APPLICATION_MODE_NORMAL = 0;
export const APPLICATION_MODE_ADMIN = 1;

export const APP_ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT || "prod";

export const PARTITION_KEY = "PartitionKey";
export const ROW_KEY = "RowKey";

export const MODE_EMPTY_CLIENT_DATA = 0;
export const MODE_CLIENT_DATA_SET = 1; // show client survey history

export const DB_ENTITY_NAME =
  APP_ENVIRONMENT === "staging" ? "StagingCOMS" : "COMS";

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
