const internals = {
  ROOT_USER_ID: 1,
  DEFAULT_LANG: 'en',
  LANG_EN: 'en',
  ERROR_MESSAGE: {
    AUTH0_USERNAME_NOT_SET: 'Cannot update username for users without an username already set',
    WRONG_EMAIL_OR_PASSWORD: 'Wrong email or password.',
    MAX_ATTEMPT_LIMIT_REACHED:
      'You have reached your maximum limit of allowed attempts. Please try after 24 hours.',
    INVALID_EMAIL:
      'Seems you have entered an invalid email, please enter a valid email and continue.',
  },
};

export default internals;
