import { Button, Modal } from "react-daisyui";
import { useForm } from "react-hook-form";
import { personType } from "..";
import { Dispatch, SetStateAction, useEffect } from "react";
import FormStudent from "./form-student";
type props = {
  person: personType[];
  editIndex: number;
  openEditModal: boolean;
  openEditModalItem: personType | undefined;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
  newPerson: (value: personType[]) => void;
};

export default function Edit({
  openEditModal,
  setOpenEditModal,
  editIndex,
  newPerson,
  openEditModalItem,
  person,
}: props) {
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue,
  } = useForm<personType>();
  const onSubmitEdit = (event: personType) => {
    const id = event.id;
    const name = event.name;
    const age = event.age;
    const gender = event.gender;
    const address = event.address;
    const province = event.province;
    const newArray = person.map((item, index) => {
      if (index === editIndex) {
        return { id, name, age, gender, address, province };
      } else {
        return item;
      }
    });
    newPerson(newArray);
  };
  useEffect(() => {
    openEditModalItem &&
      Object.entries(openEditModalItem).forEach(([key, value]: any) => {
        setValue(key, value);
      });
  }, [openEditModalItem]);

  return (
    <>
      <Modal open={openEditModal}>
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2 btn btn-error"
          onClick={() => setOpenEditModal(!openEditModal)}
        >
          ✕
        </Button>
        <Modal.Header className="font-bold">
          <div className="text-center text-xl">แก้ไขข้อมูล</div>
        </Modal.Header>
        <FormStudent
          register={registerEdit}
          handleSubmit={handleSubmitEdit}
          onSubmit={onSubmitEdit}
            action={
              <>
                <Button
                  className="btn btn-success"
                  onClick={() => {
                    setOpenEditModal(!openEditModal);
                  }}
                >
                  ยืนยัน
                </Button>
                <Button
                  className="btn btn-error"
                  onClick={() => setOpenEditModal(!openEditModal)}
                >
                  ยกเลิก
                </Button>
              </>
            }
          />
      </Modal>
    </>
  );
}
