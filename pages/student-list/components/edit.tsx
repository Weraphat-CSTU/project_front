import { Button, Modal } from "react-daisyui";
import { useForm } from "react-hook-form";
import { personType } from "..";
import { Dispatch, SetStateAction, useEffect } from "react";
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
                // const normalData = person.filter(
                //   (value) => value.id != item?.id
                // );
                // setPerson(normalData);
                setOpenEditModal(!openEditModal);
              }}
            >
              ยืนยัน
            </Button>
            <button
              className="btn btn-error"
              onClick={() => setOpenEditModal(!openEditModal)}
            >
              ยกเลิก
            </button>
          </Modal.Actions>
        </form>
      </Modal>
    </>
  );
}
