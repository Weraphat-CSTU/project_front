import { Button, Modal } from "react-daisyui";
import { personType } from "..";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2 btn btn-error"
          onClick={toggleModal}
        >
          ✕
        </Button>
        <Modal.Header className="font-bold">
          <div className="text-center text-xl">เพิ่มรายชื่อ</div>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <label className="label">
              <span className="label-text">ชื่อ</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="ชื่อ"
              className="input input-bordered w-full max-w-5xl"
              {...register("name")}
            />

            <label className="label">
              <span className="label-text">อายุ</span>
            </label>
            <input
              type="number"
              id="age"
              placeholder="อายุ"
              className="input input-bordered w-full max-w-5xl"
              {...register("age")}
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
                  {...register("gender")}
                />
                <span className="label-text pr-20">ชาย</span>
                <input
                  type="radio"
                  className="radio checked:bg-sky-500"
                  value={"female"}
                  {...register("gender")}
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
              {...register("address")}
            />

            <div className="form-control w-full max-w-5xl">
              <label className="label">
                <span className="label-text">จังหวัด</span>
              </label>
              <select
                className="select select-bordered"
                id="province"
                {...register("province")}
              >
                <option defaultValue={0}>กรุณาเลือกจังหวัด</option>
                <option value={1}>กรุงเทพ</option>
                <option value={2}>ปทุมธานี</option>
              </select>
            </div>
          </Modal.Body>

          <Modal.Actions>
            <Button
              type="submit"
              className="btn btn-outline btn-success w-full"
            >
              บันทึก
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
    </>
  );
}
