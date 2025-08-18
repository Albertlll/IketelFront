import { AnimatePresence, motion } from "motion/react";
// import { useAuthStore } from "../../model/authStore";

function ErrorMessage({ er }: { er: string[] }) {
  console.log(er)
  return (
    <AnimatePresence>
      {

        er.length != 0 &&

        <motion.div initial={{ opacity: 0, rotate: 10 }} animate={{ opacity: 100, rotate: [-10, 0] }} transition={{ duration: 1, type: "spring", stiffness: 300, damping: 10 }} className="w-full h-full flex justify-center items-center text-[23px] py-[23px] px-[38px] border-lightPrimary rounded-[20px] border-2 text-primary font-medium  ">
          {
            er.map((a, ind) => <div key={ind}>
              {a}
            </div>)
          }
        </motion.div>

      }


    </AnimatePresence>

  );
}

export default ErrorMessage;

