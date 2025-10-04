import type React from "react";
import { CgSpinnerTwo } from "react-icons/cg"

type TProps = {
    isLoading: boolean;
    loadingTitle?: string;
    children: React.ReactNode;
}

const SubmitButton = ({ isLoading, loadingTitle="Processing...", children}: TProps) => {
  return (
    <>
          <button type="submit" disabled={isLoading} className="bg-primary w-full flex justify-center items-center gap-x-2 bg-primaryColor cursor-pointer mt-10 disabled:cursor-not-allowed text-white px-18 rounded-lg py-[6px] text-lg">
              {isLoading ? (
                  <>
                      <CgSpinnerTwo className="animate-spin" fontSize={16} />
                      {loadingTitle}
                  </>
              ) : (
                  <>
                      {children}
                  </>
              )}
          </button>
    </>
  )
}

export default SubmitButton;