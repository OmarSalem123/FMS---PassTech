export const formattedEmail = (email) => {
  return email.replace(
    /^(\w)(\w*)@(\w+\.\w+)$/,
    (_, firstChar, restOfName, domain) => {
      return (
        firstChar.toUpperCase() +
        restOfName.toLowerCase() +
        "@" +
        domain.toLowerCase()
      );
    }
  );
};
