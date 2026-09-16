import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await axios.put(`http://localhost:5000/api/students/${editingId}`, {
          studentId,
          name,
          email
        });
        setStudents(students.map(s => s._id === editingId ? res.data : s));
        setEditingId(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/students", {
          studentId,
          name,
          email
        });
        setStudents([...students, res.data]);
      }
      setStudentId("");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setStudentId(student.studentId);
    setName(student.name);
    setEmail(student.email);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto", fontFamily: "Arial, sans-serif", color: "#fff" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "32px", whiteSpace: "nowrap" }}>
        Quản lý Danh sách Sinh Viên
      </h1>
      
      {/* Danh sách sinh viên */}
      <ul style={{ paddingLeft: "0", listStyle: "none", marginBottom: "35px" }}>
        {students.map(s => (
          <li key={s._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", padding: "14px 20px", backgroundColor: "#1e1e1e", border: "1px solid #333", borderRadius: "6px" }}>
            <span style={{ fontSize: "16px" }}>{s.studentId} - <strong>{s.name}</strong> - {s.email}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => handleEdit(s)} style={{ backgroundColor: "#f0ad4e", color: "white", border: "none", padding: "6px 14px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Sửa</button>
              <button onClick={() => handleDelete(s._id)} style={{ backgroundColor: "#d9534f", color: "white", border: "none", padding: "6px 14px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form Thêm / Sửa */}
      <div style={{ backgroundColor: "#1e1e1e", padding: "25px", borderRadius: "8px", border: "1px solid #333" }}>
        <h2 style={{ marginTop: "0", marginBottom: "20px", fontSize: "22px" }}>
          {editingId ? "Cập nhật sinh viên" : "Thêm sinh viên mới"}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="MSSV"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            style={{ padding: "12px", borderRadius: "4px", border: "1px solid #555", backgroundColor: "#2a2a2a", color: "#fff", fontSize: "15px" }}
          />
          <input
            type="text"
            placeholder="Họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: "12px", borderRadius: "4px", border: "1px solid #555", backgroundColor: "#2a2a2a", color: "#fff", fontSize: "15px" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "12px", borderRadius: "4px", border: "1px solid #555", backgroundColor: "#2a2a2a", color: "#fff", fontSize: "15px" }}
          />
          <div style={{ display: "flex", gap: "12px", marginTop: "5px" }}>
            <button type="submit" style={{ backgroundColor: "#0275d8", color: "white", border: "none", padding: "12px 24px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" }}>
              {editingId ? "Lưu thay đổi" : "Thêm sinh viên"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setStudentId(""); setName(""); setEmail(""); }} style={{ backgroundColor: "#6c757d", color: "white", border: "none", padding: "12px 24px", borderRadius: "4px", cursor: "pointer", fontSize: "15px" }}>
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;