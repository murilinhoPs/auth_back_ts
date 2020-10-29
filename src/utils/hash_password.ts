import bycrypt from 'bcrypt';

class HashPassword {
  public async hashPassword(passwordToHash: string) {
    const salt = await bycrypt.genSalt();

    const hashedPassword = await bycrypt.hash(passwordToHash, salt);

    return hashedPassword;
  }
}

export default new HashPassword().hashPassword;
