/**
 *
 */
export interface RequiredRule {
  /**
   * Specifies the message that is shown if the rule is broken.
   */
  message?: string;
  /**
   * Indicates whether to remove the Space characters from the validated value.
   */
  trim?: boolean;
  /**
   * Specifies the rule type. Set it to &apos;required&apos; to use the RequiredRule.
   */
  type: 'required';
}
/**
 *
 */
export interface NumericRule {
  /**
   * If set to true, empty values are valid.
   */
  ignoreEmptyValue?: boolean;
  /**
   * Specifies the message that is shown if the rule is broken.
   */
  message?: string;
  /**
   * Specifies the rule type. Set it to &apos;numeric&apos; to use the NumericRule.
   */
  type: 'numeric';
}

/**
 *
 */
export interface EmailRule {
  /**
   * If set to true, empty values are valid.
   */
  ignoreEmptyValue?: boolean;
  /**
   * Specifies the message that is shown if the rule is broken.
   */
  message?: string;
  /**
   * Specifies the rule type. Set it to &apos;email&apos; to use the EmailRule.
   */
  type: 'email';
}

/**
 *
 */
export interface RangeRule {
  /**
   * If set to true, empty values are valid.
   */
  ignoreEmptyValue?: boolean;
  /**
   * Specifies the maximum value allowed for the validated value.
   */
  max?: Date | number;
  /**
   * Specifies the message that is shown if the rule is broken.
   */
  message?: string;
  /**
   * Specifies the minimum value allowed for the validated value.
   */
  min?: Date | number;
  /**
   * Indicates whether the rule should be always checked for the target value or only when the target value changes.
   */
  reevaluate?: boolean;
  /**
   * Specifies the rule type. Set it to &apos;range&apos; to use the RangeRule.
   */
  type: 'range';
}

export interface StringLengthRule {
  /**
   * If set to true, empty values are valid.
   */
  ignoreEmptyValue?: boolean;
  /**
   * Specifies the maximum length allowed for the validated value.
   */
  max?: number;
  /**
   * Specifies the message that is shown if the rule is broken.
   */
  message?: string;
  /**
   * Specifies the minimum length allowed for the validated value.
   */
  min?: number;
  /**
   * Indicates whether or not to remove the Space characters from the validated value.
   */
  trim?: boolean;
  /**
   * Specifies the rule type. Set it to &apos;stringLength&apos; to use the StringLengthRule.
   */
  type: 'stringLength';
}

export interface CustomRule {
  /**
   * If true, the validationCallback is not executed for null, undefined, false, and empty strings.
   */
  ignoreEmptyValue?: boolean;
  /**
   * Specifies the message that is shown if the rule is broken.
   */
  message?: string;
  /**
   * Indicates whether the rule should be always checked for the target value or only when the target value changes.
   */
  reevaluate?: boolean;
  /**
   * Specifies the rule type. Set it to &apos;custom&apos; to use the CustomRule.
   */
  type: 'custom';
  /**
   * A function that validates the target value.
   */
  validationCallback?: (options: ValidationCallbackData) => boolean;
}

/**
 *
 */
export interface PatternRule {
  /**
   * If set to true, empty values are valid.
   */
  ignoreEmptyValue?: boolean;
  /**
   * Specifies the message that is shown if the rule is broken.
   */
  message?: string;
  /**
   * Specifies the regular expression that the validated value must match.
   */
  pattern?: RegExp | string;
  /**
   * Specifies the rule type. Set it to &apos;pattern&apos; to use the PatternRule.
   */
  type: 'pattern';
}

export interface AsyncRule {
  /**
   * If true, the validationCallback is not executed for null, undefined, false, and empty strings.
   */
  ignoreEmptyValue?: boolean;
  /**
   * Specifies the message that is shown if the rule is broken.
   */
  message?: string;
  /**
   * Indicates whether the rule should always be checked for the target value or only when the value changes.
   */
  reevaluate?: boolean;
  /**
   * Specifies the rule type. Set it to &apos;async&apos; to use the AsyncRule.
   */
  type: 'async';
  /**
   * A function that validates the target value.
   */
  validationCallback?: (options: ValidationCallbackData) => PromiseLike<any>;
}

export interface CompareRule {
  /**
   * Specifies the function whose return value is used for comparison with the validated value.
   */
  comparisonTarget?: () => any;
  /**
   * Specifies the operator to be used for comparing the validated value with the target.
   */
  comparisonType?: '!=' | '!==' | '<' | '<=' | '==' | '===' | '>' | '>=';
  /**
   * If set to true, empty values are valid.
   */
  ignoreEmptyValue?: boolean;
  /**
   * Specifies the message that is shown if the rule is broken.
   */
  message?: string;
  /**
   * Specifies the rule type. Set it to &apos;compare&apos; to use the CompareRule.
   */
  type: 'compare';
}

/**
 *
 */
export interface ValidationCallbackData {
  value?: string | number;
  rule: any;
  validator: any;
  data?: any;
  column?: any;
  formItem?: any;
}

export type ValidationRule =
  | AsyncRule
  | CompareRule
  | CustomRule
  | EmailRule
  | NumericRule
  | PatternRule
  | RangeRule
  | RequiredRule
  | StringLengthRule;
