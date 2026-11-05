class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  getLetterGrade(average) {
    if (average >= 90) return "A";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 60) return "D";
    else if (average >= 50) return "E";
    else return "F";
  }getFinalResult(average) {
    if (average >= 50 && this.attendance >= 75) {
      return "ناجح";
    }
    return "يحتاج مراجعة";
  }
}

const studentsList = [
  new Student(1001, "شهد محمد", [92, 88, 95], 96),
  new Student(1002, "عمر خالد", [45, 48, 42], 82),
  new Student(1003, "مريم علي", [76, 81, 73], 90),
  new Student(1004, "يوسف حسن", [39, 46, 48], 70),
];

console.log("تقرير نتائج الطلاب");
console.table(
  studentsList.map((student) => {
    const average = student.calculateAverage();
    return {
      "رقم الجلوس": student.id,
      الاسم: student.name,
      المتوسط: Number(average.toFixed(2)),
      التقدير: student.getLetterGrade(average),
      النتيجة: student.getFinalResult(average),
    };
  }),
);

const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average <= 49;
});

const studentsWithGrace = strugglingStudents.map((student) => {
  const originalAverage = student.calculateAverage();
  const averageAfterGrace = originalAverage + 5;

  return {
    id: student.id,
    name: student.name,
    originalAverage: Number(originalAverage.toFixed(2)),
    graceMarks: 5,
    averageAfterGrace: Number(averageAfterGrace.toFixed(2)),
  };
});

const totalAveragesAfterGrace = studentsWithGrace.reduce(
  (sum, student) => sum + student.averageAfterGrace,
  0,
);
const averageAfterGrace = studentsWithGrace.length
  ? totalAveragesAfterGrace / studentsWithGrace.length
  : 0;

console.log("الطلاب المتعثرون المشمولون بالرأفة (+5 درجات للمتوسط):");
console.table(studentsWithGrace);
console.log(
  "متوسط الطلاب المتعثرين بعد الرأفة:",
  Number(averageAfterGrace.toFixed(2)),
);