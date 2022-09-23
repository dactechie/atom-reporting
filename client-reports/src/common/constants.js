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

export const SLK_LENGTH = 14;

export const MILLIS_IN_DAY = 86_400_000; // 24 * 60 * 60 * 1000
export const MILLIS_IN_YEAR = 31_536_000_000; // 365 * MILLIS_IN_DAY

export const SURVEY_TYPE_MAP = {
  // Survey title : RowKey code
  InitialAssessment: "INAS",
  ITSPReview: "ITSP",
  ArcadiaITSPReview: "ITSP",
  SupplementaryIntakeAssessment: "SITK",
  PostTreatmentAssessment: "POTA",
  PsyReview: "ITSP",
  PsyEnd: "PYND"
};

//mapping of SurveyJS.io survey title to Launch-Button display name
export const SURVEY_DISPLAY_NAMES = {
  "ATOM Initial Assessment": "’New Episode’ assessment",
  "ATOM ITSP Review Assessment": "ITSP review",
  "Arcadia House Assessments": "Arcadia House Assessments",
  "ATOM Psych Assessment": "Psych Program Assessments"
};

export const ARCA = "Arcadia";

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
