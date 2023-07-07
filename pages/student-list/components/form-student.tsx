import {  Modal } from "react-daisyui";
import { personType } from "..";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
type props = {
  action: React.ReactNode;
  register: UseFormRegister<personType>;
  handleSubmit: UseFormHandleSubmit<personType, undefined>;
  onSubmit: (event: personType) => void;
};
export default function FormStudent({ action ,register,handleSubmit,onSubmit}: props) {
  return (
    <>
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
              {action}
            </Modal.Actions>
      </form>
    </>
  );
}
