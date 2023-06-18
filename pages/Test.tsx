import { useState } from "react";
import { AiOutlineRest, AiOutlineEdit } from "react-icons/ai";

type personType = {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female";
  address: string;
  province: number;
};

const AboutPage = () => {
  const [item, setItem] = useState<personType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [person, setPerson] = useState<personType[]>([
    {
      id: 1,
      address: "บ้านไอพี",
      age: 22,
      gender: "male",
      name: "พี พีรวิชญ์",
      province: 1,
    },
    {
      id: 2,
      address: "บ้านใครก็ได้",
      age: 20,
      gender: "female",
      name: "บาบายาก้า",
      province: 2,
    },
    {
      id: 3,
      address: "บ้านไอพีพี",
      age: 22,
      gender: "male",
      name: "พีพี พีรวิชญ์",
      province: 2,
    },
  ]);
  const showModel = (): JSX.Element => {
    return (
      <>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              ต้องการลบหมายเลข {item?.id} ใช่หรือไม่
            </h3>
            <p className="py-4">ชื่อ {item?.name}</p>
            <div className="modal-action flex">
              <label
                htmlFor="my_modal_6"
                className="btn"
                onClick={() => {
                  const normalData = person.filter(
                    (value) => value.id != item?.id
                  );
                  setPerson(normalData);
                }}
              >
                ยืนยัน
              </label>
              <label htmlFor="my_modal_6" className="btn">
                ยกเลิก
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };
  const showForm = (): JSX.Element => {
    return (
      <>
        <input type="checkbox" id="my_modal_1" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <form>
              <div className="text-center text-xl">เพิ่มรายชื่อ</div>
              <div className="form-control w-full max-w-5xl">
                <label className="label">
                  <span className="label-text">ชื่อ</span>
                </label>
                <input
                  type="text"
                  placeholder="ชื่อ"
                  className="input input-bordered w-full max-w-5xl"
                />

                <label className="label">
                  <span className="label-text">อายุ</span>
                </label>
                <input
                  type="number"
                  placeholder="อายุ"
                  className="input input-bordered w-full max-w-5xl"
                />

                <label className="label">
                  <span className="label-text">เพศ</span>
                </label>
                <div className="form-control w-full max-w-xs">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-sky-500"
                      value={"male"}
                      checked
                    />
                    <span className="label-text pr-20">ชาย</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-sky-500"
                      value={"female"}
                      checked
                    />
                    <span className="label-text">หญิง</span>
                  </label>
                </div>

                <label className="label">
                  <span className="label-text">ที่อยู่</span>
                </label>
                <input
                  type="text"
                  placeholder="ที่อยู่"
                  className="input input-bordered w-full max-w-5xl"
                />

                <div className="form-control w-full max-w-5xl">
                  <label className="label">
                    <span className="label-text">จังหวัด</span>
                  </label>
                  <select className="select select-bordered">
                    <option disabled selected></option>
                    <option value={1}>กรุงเทพ</option>
                    <option value={2}>ปทุมธานี</option>
                  </select>
                </div>

                <div className="flex justify-center space-x-3 pt-5 modal-action ">
                  <button
                    type="submit"
                    className="btn btn-outline btn-success w-1/2"
                  >
                    บันทึก
                  </button>
                  <label
                    className="btn btn-outline btn-error w-1/2"
                    htmlFor="my_modal_1"
                    onClick={() => setIsOpen(false)}
                  >
                    ยกเลิก
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="mx-auto max-w-5xl ">
      {showModel()}
      {showForm()}
      <div className="flex justify-center text-2xl pt-10">รายชื่อนักเรียน</div>
      <label className="btn btn-outline btn-info mt-10" htmlFor="my_modal_1">
        เพิ่มข้อมูล
      </label>
      {isOpen && (
        <form>
          <div className="form-control w-full max-w-5xl">
            <label className="label">
              <span className="label-text">ชื่อ</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อ"
              className="input input-bordered w-full max-w-5xl"
            />

            <label className="label">
              <span className="label-text">อายุ</span>
            </label>
            <input
              type="number"
              placeholder="อายุ"
              className="input input-bordered w-full max-w-5xl"
            />

            <label className="label">
              <span className="label-text">เพศ</span>
            </label>
            <div className="form-control w-full max-w-xs">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-sky-500"
                  value={"male"}
                  checked
                />
                <span className="label-text pr-20">ชาย</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-sky-500"
                  value={"female"}
                  checked
                />
                <span className="label-text">หญิง</span>
              </label>
            </div>

            <label className="label">
              <span className="label-text">ที่อยู่</span>
            </label>
            <input
              type="text"
              placeholder="ที่อยู่"
              className="input input-bordered w-full max-w-5xl"
            />

            <div className="form-control w-full max-w-5xl">
              <label className="label">
                <span className="label-text">จังหวัด</span>
              </label>
              <select className="select select-bordered">
                <option disabled selected></option>
                <option value={1}>กรุงเทพ</option>
                <option value={2}>ปทุมธานี</option>
              </select>
            </div>

            <div className="flex justify-center space-x-20 pt-5">
              <button type="submit" className="btn btn-outline btn-success">
                บันทึก
              </button>
              <button
                className="btn btn-outline btn-error"
                onClick={() => setIsOpen(false)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="overflow-x-auto pt-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>id</th>
              <th>ชื่อ</th>
              <th>อายุ</th>
              <th className="text-center">เพศ</th>
              <th>ที่อยู่</th>
              <th>จังหวัด</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {person &&
              person.map((value, index) => (
                <tr key={index}>
                  <th>{value.id}</th>
                  <td>{value.name}</td>
                  <td>{value.age}</td>
                  <td className="flex justify-center">
                    {value.gender === "male" ? (
                      <div className="bg-blue-400 text-white font-bold inline px-4 py-1">
                        male
                      </div>
                    ) : (
                      <div className="bg-pink-400 text-white font-bold inline px-3 py-1">
                        female
                      </div>
                    )}
                  </td>
                  <td>{value.address}</td>
                  <td>{value.province == 1 ? "กรุงเทพ" : "ปทุมธานี"}</td>
                  <td>
                    <AiOutlineEdit className="text-cyan-600 text-xl cursor-pointer" />
                  </td>
                  <td>
                    <label htmlFor="my_modal_6" onClick={() => setItem(value)}>
                      <AiOutlineRest className="text-red-600 text-xl cursor-pointer" />
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutPage;
