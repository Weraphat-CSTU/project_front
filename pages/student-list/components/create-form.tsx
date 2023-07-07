import { Button, Modal } from "react-daisyui";
import { personType } from "..";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormStudent from "./form-student";

type props = {
  onValueChange: (value: personType) => void;
};
export default function CreateForm({ onValueChange }: props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<personType>();

  const onSubmit = (event: personType) => {
    const id = Math.floor(Math.random() * 100) + 1;
    const name = event.name;
    const age = event.age;
    const gender = event.gender;
    const address = event.address;
    const province = event.province;

    onValueChange({ id, name, age, gender, address, province });
    setOpenModal(!openModal);
    reset();
  };
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <Button className="btn btn-outline btn-info mt-10" onClick={toggleModal}>
        เพิ่มข้อมูล
      </Button>

      <Modal open={openModal}>
        <Modal.Header className="font-bold">
          <div className="text-center text-xl">เพิ่มรายชื่อ</div>
        </Modal.Header>
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2 btn btn-error"
          onClick={toggleModal}
        >
          ✕
        </Button>
        <FormStudent
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          action={
            <Button
              type="submit"
              className="btn btn-outline btn-success w-full"
            >
              บันทึก
            </Button>
          }
        />
      </Modal>
    </>
  );
}
