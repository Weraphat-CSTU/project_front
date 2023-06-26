import { useState } from "react";
import { AiOutlineRest, AiOutlineEdit } from "react-icons/ai";
import { Button, Modal, Table } from "react-daisyui";
import { useForm } from "react-hook-form";
import CreateForm from "./components/create-form";
export type personType = {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female";
  address: string;
  province: number;
};

const AboutPage = () => {
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue,
  } = useForm<personType>();
  const [arrayIndex, setArrayIndex] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<personType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [item, setItem] = useState<personType>();
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

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const onSubmitEdit = (event: personType) => {
    const id = event.id;
    const name = event.name;
    const age = event.age;
    const gender = event.gender;
    const address = event.address;
    const province = event.province;
    const newArray = person.map((item, index) => {
      if (index === arrayIndex) {
        return { id, name, age, gender, address, province };
      } else {
        return item;
      }
    });
    setPerson(newArray);
  };

  return (
    <div className="mx-auto max-w-5xl ">
      <Modal open={visible}>
        <Modal.Header className="font-bold">
          <h3 className="font-bold text-lg">
            ต้องการลบหมายเลข {item?.id} ใช่หรือไม่
          </h3>
        </Modal.Header>

        <Modal.Body>
          <p className="py-4">ชื่อ {item?.name}</p>
        </Modal.Body>

        <Modal.Actions>
          <Button
            className="btn btn-success"
            onClick={() => {
              const normalData = person.filter((value) => value.id != item?.id);
              setPerson(normalData);
              toggleVisible();
            }}
          >
            ยืนยัน
          </Button>
          <button className="btn btn-error" onClick={toggleVisible}>
            ยกเลิก
          </button>
        </Modal.Actions>
      </Modal>

      <CreateForm
        onValueChange={(value) =>
          setPerson((oldPerson) => [...oldPerson, value])
        }
      />

      <Modal open={edit}>
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2 btn btn-error"
          onClick={() => setEdit(!edit)}
        >
          ✕
        </Button>
        <Modal.Header className="font-bold">
          <div className="text-center text-xl">แก้ไขข้อมูล</div>
        </Modal.Header>
        <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
          <Modal.Body>
            <label className="label">
              <span className="label-text">ชื่อ</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="ชื่อ"
              className="input input-bordered w-full max-w-5xl"
              {...registerEdit("name")}
            />
            <label className="label">
              <span className="label-text">อายุ</span>
            </label>
            <input
              type="number"
              id="age"
              placeholder="อายุ"
              className="input input-bordered w-full max-w-5xl"
              {...registerEdit("age")}
            />

            <label className="label">
              <span className="label-text">เพศ</span>
            </label>
            <div className="form-control w-full max-w-xs">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  className="radio checked:bg-sky-500"
                  value={"male"}
                  {...registerEdit("gender")}
                />
                <span className="label-text pr-20">ชาย</span>
                <input
                  type="radio"
                  className="radio checked:bg-sky-500"
                  value={"female"}
                  {...registerEdit("gender")}
                />
                <span className="label-text">หญิง</span>
              </label>
            </div>

            <label className="label">
              <span className="label-text">ที่อยู่</span>
            </label>
            <input
              type="text"
              id="address"
              placeholder="ที่อยู่"
              className="input input-bordered w-full max-w-5xl"
              {...registerEdit("address")}
            />

            <div className="form-control w-full max-w-5xl">
              <label className="label">
                <span className="label-text">จังหวัด</span>
              </label>
              <select
                className="select select-bordered"
                id="province"
                {...registerEdit("province")}
              >
                <option defaultValue={0}>กรุณาเลือกจังหวัด</option>
                <option value={1}>กรุงเทพ</option>
                <option value={2}>ปทุมธานี</option>
              </select>
            </div>
          </Modal.Body>

          <Modal.Actions>
            <Button
              className="btn btn-success"
              onClick={() => {
                const normalData = person.filter(
                  (value) => value.id != item?.id
                );
                setPerson(normalData);
                setEdit(!edit);
              }}
            >
              ยืนยัน
            </Button>
            <button className="btn btn-error" onClick={() => setEdit(!edit)}>
              ยกเลิก
            </button>
          </Modal.Actions>
        </form>
      </Modal>

      <div className="flex justify-center text-2xl pt-10">รายชื่อนักเรียน</div>

      <div className="overflow-x-auto pt-10">
        <Table className="table table-zebra w-full">
          {/* head */}
          <Table.Head>
            <span>id</span>
            <span>ชื่อ</span>
            <span>อายุ</span>
            <span className="flex justify-center">เพศ</span>
            <span>ที่อยู่</span>
            <span>จังหวัด</span>
            <span>แก้ไข</span>
            <span>ลบ</span>
          </Table.Head>
          <Table.Body>
            {/* row 1 */}
            {person &&
              person.map((value, index) => (
                <Table.Row key={index}>
                  <span>{value.id}</span>
                  <span>{value.name}</span>
                  <span>{value.age}</span>
                  <span className="flex justify-center">
                    {value.gender === "male" ? (
                      <div className="bg-blue-400 text-white font-semibold inline px-4 py-1 rounded-sm">
                        male
                      </div>
                    ) : (
                      <div className="bg-pink-400 text-white font-semibold inline px-3 py-1 rounded-sm">
                        female
                      </div>
                    )}
                  </span>
                  <span>{value.address}</span>
                  <span>{value.province == 1 ? "กรุงเทพ" : "ปทุมธานี"}</span>
                  <span>
                    <label
                      onClick={() => {
                        setEdit(!edit);
                        setEditItem(value);
                        Object.entries(value).forEach(([name, value]: any) =>
                          setValue(name, value)
                        );
                        setArrayIndex(index);
                      }}
                    >
                      <AiOutlineEdit className="text-cyan-600 text-xl cursor-pointer" />
                    </label>
                  </span>
                  <span>
                    <label
                      htmlFor="my_modal_6"
                      onClick={() => {
                        setItem(value);
                        toggleVisible();
                      }}
                    >
                      <AiOutlineRest className="text-red-600 text-xl cursor-pointer" />
                    </label>
                  </span>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AboutPage;
