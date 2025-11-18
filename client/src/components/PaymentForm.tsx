import { paymentFormScheme, PaymentFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = ({
  setPaymentForm,
}: {
  setPaymentForm: (data: PaymentFormType) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormType>({
    resolver: zodResolver(paymentFormScheme),
  });

  const router = useRouter();

  const handlePaymentForm: SubmitHandler<PaymentFormType> = (
    data: PaymentFormType
  ) => {
    setPaymentForm(data);
    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handlePaymentForm)}
    >
      {/* Full Name Field */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardHolderName"
          className="text-xs text-gray-500 font-medium"
        >
          Card Holder Name
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cardHolderName"
          placeholder="Your Card Holder Name"
          {...register("cardHolderName")}
        />
        {errors.cardHolderName && (
          <p className="text-xs text-red-500">
            {errors.cardHolderName.message}
          </p>
        )}
      </div>
      {/* Card Number Field */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="cardNumber"
          className="text-xs text-gray-500 font-medium"
        >
          Card Number
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cardNum"
          placeholder="Your Card Number"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>
      {/* Phone Number Field */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="expirationDate"
          className="text-xs text-gray-500 font-medium"
        >
          Expiration Date (MM/YY)
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="expirationDate"
          placeholder="MM/YY"
          {...register("expirationDate")}
        />
        {errors.expirationDate && (
          <p className="text-xs text-red-500">
            {errors.expirationDate.message}
          </p>
        )}
      </div>
      {/* CVV Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
          CVV
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cvv"
          placeholder="000"
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-xs text-red-500">{errors.cvv.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image
          src={"/klarna.png"}
          alt="klarna"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src={"/cards.png"}
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src={"/stripe.png"}
          alt="stripe"
          width={50}
          height={25}
          className="rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
      >
        Continue
        <ArrowRight className="w-3 h-3 inline-block ml-2" />
      </button>
    </form>
  );
};

export default PaymentForm;
