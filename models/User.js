export class User {
   constructor(id, username, password) {
      this.id = id || ""
      this.username = username || ""
      this.password = password || ""
   }

   static from(user) {
      return new User(
         user.id,
         user.username,
         user.password
      )
   }
}