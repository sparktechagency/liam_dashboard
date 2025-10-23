/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import SubmitButton from "../../form/SubmitButton";
import { useUpdateProfileMutation } from "../../../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { SetProfileError } from "../../../redux/features/user/userSlice";
import FormError from "../../validation/FormError";
import { IUser } from "../../../types/user.type";

type TProps = {
  profilePic: File | null;
  user: IUser
}

const EditProfile = ({ profilePic, user }: TProps) => {
  const dispatch = useAppDispatch();
  const { profileError } = useAppSelector((state) => state.user) 
  const [ updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onFinish = (values: any) => {
    dispatch(SetProfileError(""))
    const formData = new FormData();
    formData.append("data", JSON.stringify({ fullName: values.fullName }));
    if (profilePic) {
      formData.append("file", profilePic)
    }
    updateProfile({
      id: user?._id,
      data: formData
    })
  };

  return (
    <div className="bg-white px-20 w-[715px] py-5 rounded-md">
      <p className="text-primary text-center font-bold text-xl mb-5">
        Edit Your Profile
      </p>
      {profileError && <FormError message={profileError} />}
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ 
          fullName: user?.fullName,
          email: user?.email
         }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            { required: true, message: "Please enter full name !" },
          ]}
        >
          <Input
            placeholder="Enter your full name"
            className="rounded-none py-2"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: 'email',
              message: 'Invalid email address',
            },
          ]}
        >
          <Input
            disabled
            placeholder="Enter your email"
            className="rounded-none py-2"
          />
        </Form.Item>
          <SubmitButton isLoading={isLoading}>Save Changes</SubmitButton>
      </Form>
    </div>
  );
};

export default EditProfile;
