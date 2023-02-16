export class Student {
   constructor(id, name, age, course, registration) {
      this.id = id || ""
      this.name = name || ""
      this.age = age || 0
      this.course = course || ""
      this.registration = registration || ""
   }

   static from(student) {
      return new Student(
         student.id,
         student.name,
         student.age,
         student.course,
         student.registration
      )
   }
}