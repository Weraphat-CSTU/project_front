import { useState } from "react";
import { AiOutlineRest, AiOutlineEdit } from "react-icons/ai";
import { Button, Modal, Table } from "react-daisyui";
import { useForm } from "react-hook-form";
import CreateForm from "./components/create-form";
import TableForm from "./components/table";
import EditForm from "./components/edit";
export type personType = {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female";
  address: string;
  province: number;
};

const AboutPage = () => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [arrayIndex, setArrayIndex] = useState<number>(0);
  const [editItem, setEditItem] = useState<personType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [item, setItem] = useState<personType>(); // เปนตัวแปรสำหรับเก็บข้อมูลที่จะลบ
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
      <TableForm
        person={person}
        arrayIndex={(value)=>{
          setArrayIndex(value);
          setOpenEditModal(!openEditModal);
          setEditItem(person.find((_value,index)=>index === value));
        }}
        onValueCLick={(value) => {
          setItem(value);
          setVisible(!visible);
        }}
      />
      <EditForm
        openEditModal={openEditModal}
        editIndex={arrayIndex}
        openEditModalItem={editItem}
        person={person}
        setOpenEditModal={setOpenEditModal}
        newPerson={(value) => setPerson(value)}
      />
    </div>
  );
};

export default AboutPage;
