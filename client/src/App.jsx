import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Lấy danh sách sinh viên (Câu 47)
  useEffect(() => {
    axios.get("https://upgraded-space-spork-p7g656qvv75rc9694-5000.app.github.dev/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  // Submit form để thêm sinh viên (Câu 48–49)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://upgraded-space-spork-p7g656qvv75rc9694-5000.app.github.dev/api/students", {
        studentId,
        name,
        email
      });
      setStudents([...students, res.data]); // cập nhật danh sách ngay
      setStudentId("");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh sách sinh viên</h1>
      <ul>
        {students.map(s => (
          <li key={s._id}>
            {s.studentId} - {s.name} - {s.email}
          </li>
        ))}
      </ul>

      <h2>Thêm sinh viên mới</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="MSSV"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default App;
