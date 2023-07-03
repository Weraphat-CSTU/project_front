import { type } from "os";
import { useState } from "react";
import { Table } from "react-daisyui";
import { AiOutlineEdit, AiOutlineRest } from "react-icons/ai";
import { personType } from "..";

type props = {
  person: personType[];
  onValueCLick: (valueItem: personType) => void;
  arrayIndex:(array:number)=> void;
};
export default function TableForm({ person, onValueCLick ,arrayIndex}: props) {
  return (
    <>
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
            {person.map((value, index) => (
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
                      arrayIndex(index);
                    }}
                  >
                    <AiOutlineEdit className="text-cyan-600 text-xl cursor-pointer" />
                  </label>
                </span>
                <span>
                  <label
                    htmlFor="my_modal_6"
                    onClick={() => {
                      onValueCLick(value);
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
    </>
  );
}
