import { UserAnswerStatus } from "../types";

export default (type: UserAnswerStatus): string => {
  switch (type) {
    case UserAnswerStatus.UNSUBMITTED:
      return "answer--unsubmitted";
    case UserAnswerStatus.PASS:
      return "answer--pass";
    case UserAnswerStatus.FAIL:
      return "answer--fail";
    default:
      return "";
  }
};
