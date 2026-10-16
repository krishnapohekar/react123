import axios from "axios";
import { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:6060/car";

function App() {
  const [cars, setcars] = useState([]);
  const [edit, isedit] = useState(false);
  const [form, setform] = useState({ id: "", name: "", model: "" });
  const [message, setmessage] = useState("");

  const fetchcars = async () => {
    const res = await axios.get(url);
    setcars(res.data);
  };

  useEffect(() => {
    fetchcars();
  }, []);

  const change = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    try {
      if (edit) {
        await axios.put(url, form);
        setmessage("car updated");
      } else {
        await axios.post(url, form);
        setmessage("book added");
      }
      setform({ id: "", name: "", model: "" });
      isedit(false);
      fetchcars();
    } catch  {
      setmessage("error in submit");
    }
  };
    const del = async (id) => {
      await axios.delete(url, { data: { id } });
      setmessage("deleted");
      fetchcars();
    };

    return (
      <>
      
        <div className="container">
          <div className="table-responsive">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>
                    <input
                      type="text"
                      name="id"
                      value={form.id}
                      onChange={change}
                      id=""
                    />
                  </td>
                  <td>Name</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={change}
                      id=""
                    />
                  </td>
                  <td>model</td>

                  <td>
                    <input
                      type="text"
                      name="model"
                      value={form.model}
                      onChange={change}
                      id=""
                    />
                  </td>
                  <td>
                    <button className="btn btn-primary" onClick={submit}>submit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                <th>ID</th>
                <th>name</th>
                <th>model</th>
                </tr>

              </thead>
              <tbody>
                {
                  cars.map((e)=>{

                    return(<tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.model}</td>
                      <td>
                        <button className="btn btn-warning" onClick={()=>{setform(e),isedit(true)}}>edit</button>
                      </td>
                      <td>
                        <button className="btn btn-warning" onClick={()=>{del(e.id)}}>delete</button>
                      </td>

                    </tr>
                  )})
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

export default App;
