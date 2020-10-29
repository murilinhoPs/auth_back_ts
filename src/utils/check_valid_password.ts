import bycrypt from 'bcrypt';

function checkIfUnencryptedPasswordIsValid(
  unencryptedPassword: string,
  currentUserPassword: string
) {
  return bycrypt.compareSync(unencryptedPassword, currentUserPassword);
}

export default checkIfUnencryptedPasswordIsValid;
