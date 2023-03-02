import React, { useState, useEffect } from "react";
import classNames from "classnames";
import {
  Button,
  Tag,
  Notification,
  toast,
  FormContainer,
  Dialog,
} from "components/ui";
import FormDesription from "./FormDesription";
import FormRow from "./FormRow";
import CreditCardForm from "./CreditCardForm";
import BillingHistory from "./BillingHistory";
import { Field, Form, Formik } from "formik";
import { HiPlus } from "react-icons/hi";
import { Loading } from "components/shared";
import isEmpty from "lodash/isEmpty";
import { apiGetAccountSettingBillingData } from "services/AccountServices";
import { checkout, updateSubscription } from "services/companyService";
import { getCustomer } from "services/AuthService";
import { setCompany } from "../../../../store/auth/companySlice";
import { setUser } from "../../../../store/auth/userSlice";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Segment } from "components/ui";
import { HiCheckCircle } from "react-icons/hi";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Billing = () => {
  const [data, setData] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [ccDialogType, setCcDialogType] = useState("");
  const segmentSelections = [
    {
      value: "Starter",
      desc: "The plan for personal.",
      disabled: false,
      priceId: "price_1MeP3jC881dTL9o49YOU56hn",
      cost: "$199",
    },
    {
      value: "Professional",
      desc: "The plan for team",
      disabled: false,
      priceId: "price_1MeeDfC881dTL9o4tPwjyYjz",
      cost: "$499",
    },
    {
      value: "Enterprise",
      desc: "Talk to us for business plan.",
      disabled: false,
      priceId: "price_1MeeCeC881dTL9o4ONyRh5wK",
      cost: "$799",
    },
  ];
  const [customer, setCustomer] = useState({});
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user?.email);
  const getNewCustomer = () => {
    setLoadingData(true);
    getCustomer(email).then((data) => {
      setCustomer(data.data.user);
      setLoadingData(false);
      console.log();
      dispatch(setCompany(data?.data?.user.company));
      if (data?.data?.user.company.paymentStatus === "paid") {
        dispatch(
          setUser(
            {
              ...data?.data?.user,
              // authority: ["USER", "admin", "user"],
              userName: data?.data?.user.name,
            } || {
              avatar: "",
              userName: "Anonymous",
              authority: ["USER", "admin", "user"],
              email: "",
            }
          )
        );
      }
    });
    //   .catch(setLoadingData(false));
  };

  useEffect(() => {
    getNewCustomer();
  }, []);

  const accountActive =
    customer.stripeCustomer?.subscriptions[0]?.status === "active";
  //   const customer?.stripeCustomer?.subscriptions[0]?.plan.id = useSelector(
  //     (state) => customer.stripeCustomer?.subscriptions[0]?.status==='active'
  //   );

  const navigate = useNavigate();
  const stripe = useStripe();
  const user = useSelector((state) => state.auth.user);
  const elements = useElements();

  const fetchData = async () => {
    const response = await apiGetAccountSettingBillingData();
    setData(response.data);
  };

  const onFormSubmit = (_, setSubmitting) => {
    toast.push(
      <Notification title={"Billing information updated"} type="success" />,
      {
        placement: "top-center",
      }
    );
    setSubmitting(false);
  };

  const onCreditCardDialogClose = () => {
    setCcDialogType("");
    setSelectedCard({});
  };

  const onEditCreditCard = (card, type) => {
    setCcDialogType(type);
    setSelectedCard(card);
  };

  console.log(customer?.stripeCustomer?.subscriptions);
  const onCardUpdate = (cardValue, form, field) => {
    let paymentMethodsValue = form.values[field.name];

    if (cardValue.primary) {
      paymentMethodsValue.forEach((card) => {
        card.primary = false;
      });
    }

    if (!paymentMethodsValue.some((card) => card.cardId === cardValue.cardId)) {
      paymentMethodsValue.push(cardValue);
    }

    paymentMethodsValue = paymentMethodsValue.map((card) => {
      if (card.cardId === cardValue.cardId) {
        card = { ...card, ...cardValue };
      }
      return card;
    });

    let cardTemp = {};
    paymentMethodsValue = paymentMethodsValue.filter((card) => {
      if (card.primary) {
        cardTemp = card;
      }
      return !card.primary;
    });
    paymentMethodsValue = [...[cardTemp], ...paymentMethodsValue];
    form.setFieldValue(field.name, paymentMethodsValue);
    onCreditCardDialogClose();
  };

  const onRedirect = (url) => {
    let win = window.open(url, "_blank");
    win.focus();
  };
  const onNewCheckout = (priceId) => {
    setLoadingData(true);
    const price = {
      productId: priceId,
      customer: customer?.stripeCustomerId,
    };
    console.log(price);
    checkout(price).then(async (data) => {
      setLoadingData(false);
      window.location.href = data.session;
      //   navigate(data.session);
    });
  };
  const onCheckout = (priceId) => {
    if (priceId !== customer?.stripeCustomer?.subscriptions[0]?.plan.id) {
      setLoadingData(true);
      // const price = {
      //   productId: priceId,
      //   customer: user?.stripeCustomerId,
      // };
      // setLoading(true);
      // checkout(price).then(async (data) => {
      //   console.log(data);
      //   setLoading(false);
      //   window.location.href = data.session;
      //   //   navigate(data.session);
      // });
      // window.location.href =
      //   "https://billing.stripe.com/p/login/test_28oaGY2WX0wNgr6aEE?prefilled_email=" +
      //   user.email;

      updateSubscription({
        subscriptionId: customer?.stripeCustomer?.subscriptions[0]?.id,
        price: priceId,
      })
        .then(() => {
          setLoadingData(false);
          getNewCustomer();
        })
        .catch(() => {
          setLoadingData(false);
          getNewCustomer();
        });
    }
  };

  console.log(customer);

  function stripeEmbed() {
    return {
      __html: `<script async src="https://js.stripe.com/v3/pricing-table.js"></script>
	  <stripe-pricing-table pricing-table-id="prctbl_1MeZqlC881dTL9o4gRnjn4sq"
	  publishable-key="pk_test_51HRQu6C881dTL9o4agsuRGi2tLTVoQancReouVVlz3rq1Ljl6nWcLoil3oLKufSeJouBWP3EkWdS2H375ViNK60e00NlnXjZDW">
	  </stripe-pricing-table>`,
    };
  }
  useEffect(() => {
    if (isEmpty(data)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Loading loading={loadingData} type="cover">
      <Formik
        initialValues={data}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setTimeout(() => {
            onFormSubmit(values, setSubmitting);
          }, 1000);
          window.location.href =
            "https://billing.stripe.com/p/login/test_28oaGY2WX0wNgr6aEE?prefilled_email=" +
            customer.email;
        }}
      >
        {({ values, touched, errors, isSubmitting, resetForm }) => {
          const validatorProps = { touched, errors };
          return (
            <Form>
              <FormContainer>
                <div dangerouslySetInnerHTML={stripeEmbed()} />
                <FormDesription title="Payment Method" />
                <FormRow
                  name="paymentMethods"
                  alignCenter={false}
                  label="Credit Cards"
                  {...validatorProps}
                >
                  <div className="rounded-lg border border-gray-200 dark:border-gray-600">
                    {customer.stripeCustomer?.paymentMethods?.map(
                      (card, index) => (
                        <div
                          key={card.cardId}
                          className={classNames(
                            "flex items-center justify-between p-4",

                            "border-b border-gray-200 dark:border-gray-600"
                          )}
                        >
                          <div className="flex items-center">
                            {card.card.brand === "visa" && (
                              <img src="/img/others/img-8.png" alt="visa" />
                            )}
                            {card.card.brand === "master" && (
                              <img src="/img/others/img-9.png" alt="master" />
                            )}
                            <div className="ml-3 rtl:mr-3">
                              <div className="flex items-center">
                                <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                  {card.cardHolderName} •••• {card.card.last4}
                                </div>
                                {card.id ===
                                  customer?.stripeCustomer?.default_source && (
                                  <Tag className="bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-100 rounded-md border-0 mx-2">
                                    <span className="capitalize">
                                      {" "}
                                      Primary{" "}
                                    </span>
                                  </Tag>
                                )}
                              </div>
                              <span>
                                Expiring{" "}
                                {months[parseInt(card.card.exp_month) - 1]}{" "}
                                {card.card.exp_year}
                              </span>
                            </div>
                          </div>
                          <div className="flex">
                            <Button
                              size="sm"
                              onClick={() => onEditCreditCard(card, "EDIT")}
                              type="button"
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="plain"
                      size="sm"
                      icon={<HiPlus className="text-lg" />}
                      onClick={() => onEditCreditCard({}, "NEW")}
                    >
                      <span className="font-semibold">Add new card</span>
                    </Button>
                  </div>
                </FormRow>
                <FormRow
                  border={false}
                  name="otherMethod"
                  alignCenter={false}
                  label="Plans"
                  {...validatorProps}
                >
                  <Loading loading={loading} type={"cover"}>
                    {!accountActive &&
                    customer?.stripeCustomer?.invoices[0]
                      ?.hosted_invoice_url ? (
                      <></>
                    ) : (
                      <>
                        {customer?.stripeCustomer?.subscriptions[0]?.plan.id ? (
                          <Segment
                            defaultValue={["Team"]}
                            className="gap-2 md:flex-row flex-col"
                          >
                            {segmentSelections.map((item, index) => (
                              <>
                                {" "}
                                <Segment.Item
                                  value={item.value}
                                  key={item.value}
                                  disabled={
                                    item.priceId ===
                                    customer?.stripeCustomer?.subscriptions[0]
                                      ?.plan.id
                                      ? true
                                      : false
                                  }
                                >
                                  {({
                                    ref,
                                    active,
                                    value,
                                    onSegmentItemClick,
                                    disabled,
                                  }) => {
                                    return (
                                      <div
                                        ref={ref}
                                        className={classNames(
                                          "flex",
                                          "ring-1",
                                          "justify-between",
                                          "border",
                                          "rounded-md ",
                                          "border-gray-300",
                                          "py-5 px-4",
                                          "cursor-pointer",
                                          "select-none",
                                          "w-100",
                                          "md:w-[260px]",
                                          active
                                            ? "ring-cyan-500 border-cyan-500"
                                            : "ring-transparent",
                                          disabled
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:ring-cyan-500 hover:border-cyan-500"
                                        )}
                                        onClick={() => onCheckout(item.priceId)}
                                      >
                                        <div>
                                          <h6>{value}</h6>
                                          <p>{item.desc}</p>
                                        </div>
                                        {true && (
                                          <HiCheckCircle className="text-cyan-500 text-xl" />
                                        )}{" "}
                                        {item.priceId ===
                                        customer?.stripeCustomer
                                          ?.subscriptions[0]?.plan.id
                                          ? "Current Plan"
                                          : ""}
                                        {/* <div className="mt-4 ltr:text-right">
                                  <Button
                                    size="sm"
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                  >
                                    {isSubmitting ? "Updating" : "Upgrade"}
                                  </Button>
                                </div> */}
                                      </div>
                                    );
                                  }}
                                </Segment.Item>
                              </>
                            ))}
                          </Segment>
                        ) : (
                          <Segment
                            defaultValue={["Team"]}
                            className="gap-2 md:flex-row flex-col"
                          >
                            {segmentSelections.map((item, index) => (
                              <>
                                {" "}
                                <Segment.Item
                                  value={item.value}
                                  key={item.value}
                                >
                                  {({
                                    ref,
                                    active,
                                    value,
                                    onSegmentItemClick,
                                    disabled,
                                  }) => {
                                    return (
                                      <div
                                        ref={ref}
                                        className={classNames(
                                          "flex",
                                          "ring-1",
                                          "justify-between",
                                          "border",
                                          "rounded-md ",
                                          "border-gray-300",
                                          "py-5 px-4",
                                          "cursor-pointer",
                                          "select-none",
                                          "w-100",
                                          "md:w-[260px]",
                                          active
                                            ? "ring-cyan-500 border-cyan-500"
                                            : "ring-transparent",
                                          disabled
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:ring-cyan-500 hover:border-cyan-500"
                                        )}
                                        onClick={() =>
                                          onNewCheckout(item.priceId)
                                        }
                                      >
                                        <div>
                                          <h6>
                                            {value}-{item.cost}
                                          </h6>
                                          <p>{item.desc}</p>
                                          {/* <p></p> */}
                                        </div>
                                        {true && (
                                          <HiCheckCircle className="text-cyan-500 text-xl" />
                                        )}{" "}
                                        {item.priceId ===
                                        customer?.stripeCustomer
                                          ?.subscriptions[0]?.plan.id
                                          ? "Current Plan"
                                          : ""}
                                        {/* <div className="mt-4 ltr:text-right">
                                  <Button
                                    size="sm"
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                  >
                                    {isSubmitting ? "Updating" : "Upgrade"}
                                  </Button>
                                </div> */}
                                      </div>
                                    );
                                  }}
                                </Segment.Item>
                              </>
                            ))}
                          </Segment>
                        )}
                      </>
                    )}
                  </Loading>
                </FormRow>
                <Dialog
                  isOpen={ccDialogType === "NEW" || ccDialogType === "EDIT"}
                  onClose={onCreditCardDialogClose}
                  onRequestClose={onCreditCardDialogClose}
                >
                  <h5 className="mb-4">Edit Credit Card</h5>
                  <Field name="paymentMethods">
                    {({ field, form }) => {
                      return (
                        <CreditCardForm
                          type={ccDialogType}
                          card={selectedCard}
                          onUpdate={(cardValue) =>
                            onCardUpdate(cardValue, form, field)
                          }
                        />
                      );
                    }}
                  </Field>
                </Dialog>
                ${" "}
                {Math.round(
                  (customer?.stripeCustomer?.balance * -1) / 100
                ).toFixed(2)}{" "}
                is left in your account
                {!accountActive &&
                  customer?.stripeCustomer?.invoices[0]?.hosted_invoice_url && (
                    <div className="mt-4 ltr:text-right">
                      <Button
                        className="ltr:mr-2 rtl:ml-2 text-red-400 block"
                        type="button"
                        onClick={() => {
                          window.location.href =
                            customer.stripeCustomer.invoices[0].hosted_invoice_url;
                        }}
                      >
                        Pay Now
                      </Button>
                    </div>
                  )}
                {/* <Button variant="solid" loading={isSubmitting} type="submit">
                  {isSubmitting ? "Updating" : "Update Cards"}
                </Button> */}
                <FormDesription
                  className=""
                  title={!accountActive && "Payment Failed"}
                  desc={
                    !accountActive &&
                    "You're currently on a plab but your payment failed"
                  }
                />
                <FormDesription className="" title="Billin Histor" />
                <BillingHistory
                  className="mt-4 rounded-lg border border-gray-200 dark:border-gray-600"
                  data={customer?.stripeCustomer?.invoices}
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </Loading>
  );
};

export default Billing;
