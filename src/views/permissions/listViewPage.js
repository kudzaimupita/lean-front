import React, { useMemo } from "react";
import reducer from "../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../TableView/Table";
// import {
//   deletePermissions,
//   deletePermission,
//   getNewPermissions,
// } from "../../services/issueService";
import {
  deletePermissions,
  deletePermission,
  getNewPermissions,
} from "../../services/permissionService";
import Quiz from "react-quiz-component";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge, Checkbox } from "components/ui";
import ProductTableTools from "../TableView/TableTools";
import ItemDeleteConfirmation from "../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import CustomerStatistic from "../TableView/Statistic";
import { Tabs } from "components/ui";
import { HiOutlineHome, HiOutlineUser, HiOutlinePhone } from "react-icons/hi";

const { TabNav, TabList, TabContent } = Tabs;
const quiz = {
  quizTitle: "React Quiz Component Demo",
  quizSynopsis:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
  nrOfQuestions: "4",
  questions: [
    {
      question:
        "How can you access the state of a component from inside of a member function?",
      questionType: "text",
      questionPic: "https://dummyimage.com/600x400/000/fff&text=X", // if you need to display Picture in Question
      answerSelectionType: "single",
      answers: [
        "this.getState()",
        "this.prototype.stateValue",
        "this.state",
        "this.values",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      question: "ReactJS is developed by _____?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Google Engineers", "Facebook Engineers"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      question: "ReactJS is an MVC based framework?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["True", "False"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "10",
    },
    {
      question: "Which of the following concepts is/are key to ReactJS?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Component-oriented design",
        "Event delegation model",
        "Both of the above",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "30",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      questionType: "photo",
      answerSelectionType: "single",
      answers: [
        "https://dummyimage.com/600x400/000/fff&text=A",
        "https://dummyimage.com/600x400/000/fff&text=B",
        "https://dummyimage.com/600x400/000/fff&text=C",
        "https://dummyimage.com/600x400/000/fff&text=D",
      ],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      question: "What are the advantages of React JS?",
      questionType: "text",
      answerSelectionType: "multiple",
      answers: [
        "React can be used on client and as well as server side too",
        "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
        "React components have lifecycle events that fall into State/Property Updates",
        "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer",
      ],
      correctAnswer: [1, 2, 4],
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
  ],
};
const rolesArr = [
  "User Management",
  "Content Management",
  "Disputes Management",
  "Database Management",
  "Financial Management",
  "Reporting",
  "API Control",
  "Repository Management",
  "Payroll",
];
injectReducer("dataList", reducer);
const permissions = [
  {
    name: "Assets",
    permissions: [
      {
        label: "Create Assets",
        value: "createAssets",
        key: "assets",
        type: "create",
      },
      { label: "Read Asset Single", value: "readAssetSingle", key: "assets" },
      { label: "Read Assets Many", value: "readAssetMany", key: "assets" },
      { label: "Update Assets", value: "updateAssets", key: "assets" },
      { label: "Delete Assets", value: "deleteAssets", key: "assets" },
      {
        label: "Read Write My Assets",
        value: "readAndWriteUserAssets",
        key: "assets",
      },
      { label: "Read Asset Reports", value: "readAssetReports", key: "assets" },
      {
        label: "Read Asset Analytics",
        value: "readAssetAnalytics",
        key: "assets",
      },
    ],
  },
  {
    name: "AssetTypes",
    permissions: [
      {
        label: "Create AssetTypes",
        value: "createAssetTypes",
        key: "assetTypes",
      },
      {
        label: "Read AssetTypes Single",
        value: "readAssetTypesSingle",
        key: "assetTypes",
      },
      {
        label: "Read AssetTypes Many",
        value: "readAssetTypesMany",
        key: "assetTypes",
      },
      {
        label: "Update AssetTypes",
        value: "updateAssetTypes",
        key: "assetTypes",
      },
      {
        label: "Delete AssetTypes",
        value: "deleteAssetTypes",
        key: "assetTypes",
      },
      {
        label: "Read Write My AssetTypes",
        value: "readAndWriteUserAssetTypes",
        key: "assetTypes",
      },
      {
        label: "Read AssetTypes Reports",
        value: "readAssetTypesReports",
        key: "assetTypes",
      },
      {
        label: "Read AssetTypes Analytics",
        value: "readAssetTypesAnalytics",
        key: "assetTypes",
      },
    ],
  },
];
const ProductColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const avatar = true ? (
    <Avatar
      size="sm"
      icon={<FiTruck />}
      //   src={
      //     "https://images.unsplash.com/photo-1631744591853-998c4308bbb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      //   }
    />
  ) : (
    <Avatar icon={<FiTruck />} />
  );

  return (
    <div className="flex items-center h-3">
      {avatar}
      <Link
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
        to={`/app/vehicles/view/${row.id}`}
      >
        {row.name}
      </Link>
      {/* <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span> */}
    </div>
  );
};
const ProductList = () => {
  const columns = useMemo(() => [
    {
      Header: "",
      accessor: "vehiclse",
      //
      Cell: (props) => {
        const row = props.row.original;
        return <ProductColumn row={row} />;
      },
    },
    {
      Header: "Create",
      accessor: "vehicle",

      Cell: (props) => {
        const row = props.row.original;
        return (
          <span className="capitalize">
            {" "}
            <Checkbox></Checkbox>
          </span>
        );
      },
    },
    {
      Header: "Read",
      accessor: "location",

      Cell: (props) => {
        const row = props.row.original;
        return (
          <span className="capitalize">
            <Checkbox></Checkbox>
          </span>
        );
      },
    },
    {
      Header: "Update",
      accessor: "Update",

      Cell: (props) => {
        const row = props.row.original;
        return (
          <span className="capitalize">
            <Checkbox></Checkbox>
          </span>
        );
      },
    },
    {
      Header: "Delete",
      accessor: "assignedTo",

      Cell: (props) => {
        const row = props.row.original;
        return (
          <span className="capitalize">
            <Checkbox></Checkbox>
          </span>
        );
      },
    },
    {
      Header: "Read reports",
      accessor: "status",

      Cell: (props) => {
        const row = props.row.original;
        return (
          <span className="capitalize">
            <Checkbox></Checkbox>
          </span>
        );
      },
    },
    {
      Header: "Read Analytics",
      accessor: "signedOff",

      Cell: (props) => {
        const row = props.row.original;
        return (
          <span className="capitalize">
            <Checkbox></Checkbox>
          </span>
        );
      },
    },
  ]);

  console.log();
  return (
    <>
      {" "}
      <Quiz quiz={quiz} shuffle={true} />
      <CustomerStatistic />
      <AdaptableCard className="h-full" bodyClass="h-full">
        <Tabs defaultValue="tab1">
          <TabList>
            <TabNav value="tab1" icon={<HiOutlineHome />}>
              Assets
            </TabNav>
            <TabNav value="tab2" icon={<HiOutlineUser />}>
              HR
            </TabNav>
            <TabNav value="tab3" icon={<HiOutlinePhone />}></TabNav>
          </TabList>
          <div className="p-4">
            <TabContent value="tab1">
              {/* <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Asset Permissions</h3>

                <ProductTableTools
                  search
                  deleteMethod={deletePermissions}
                  dataMethod={getNewPermissions}
                />
              </div> */}
              <ProductTable
                hideDateColumn={true}
                editRoute
                showSelect={false}
                newColumns={columns}
                dataMethod={getNewPermissions}
                deleteMethod={deletePermission}
              />
              <ItemDeleteConfirmation
                deleteMethod={deletePermission}
                dataMethod={getNewPermissions}
              />
            </TabContent>
            <TabContent value="tab2">
              <p>
                A computer lets you make more mistakes faster than any invention
                in human history–with the possible exceptions of handguns and
                tequila. (Mitch Radcliffe).
              </p>
            </TabContent>
            <TabContent value="tab3">
              <p>
                In C++ it’s harder to shoot yourself in the foot, but when you
                do, you blow off your whole leg. (Bjarne Stroustrup)
              </p>
            </TabContent>
          </div>
        </Tabs>
      </AdaptableCard>
    </>
  );
};

export default ProductList;
