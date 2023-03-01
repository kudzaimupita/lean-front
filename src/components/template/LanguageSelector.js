import React, { useMemo, useState, useEffect } from "react";
import { Avatar, Dropdown, Spinner } from "components/ui";
import classNames from "classnames";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { useSelector, useDispatch } from "react-redux";
import { setLang } from "store/theme/themeSlice";
import { setSite } from "store/auth/siteSlice";
import { dateLocales } from "locales";
import dayjs from "dayjs";
import i18n from "i18next";

import { HiCheck } from "react-icons/hi";

const languageList = [
  { label: "English", value: "en", flag: "us" },
  { label: "Chinese", value: "zh-cn", flag: "cn" },
  { label: "Espanol", value: "es", flag: "sp" },
  { label: "Arabic", value: "ar", flag: "ar" },
];

export const LanguageSelector = ({ className }) => {
  const [loading, setLoading] = useState(false);

  const locale = useSelector((state) => state.theme.locale);
  const sites = useSelector((state) => state.auth?.company?.sites);
  const selectedSite = useSelector((state) => state.auth?.site);
  const dispatch = useDispatch();

  const selectLangFlag = useMemo(() => {
    return languageList.find((lang) => lang.value === locale).flag;
  }, [locale]);

  const selectedLanguage = (
    <div className={classNames(className, "flex items-center")}>
      {selectedSite.name}
      {/* {loading ? (
        <Spinner size={20} />
      ) : (
        <Avatar
          size={24}
          shape="circle"
          src={`/img/countries/${selectLangSite}.png`}
        />
      )} */}
    </div>
  );

  const onLanguageSelect = (site) => {
    dispatch(setSite(site));
    // const formattedLang = lang.replace(/-([a-z])/g, function (g) {
    //   return g[1].toUpperCase();
    // });

    // setLoading(true);

    // const dispatchLang = () => {
    //   i18n.changeLanguage(formattedLang);
    //   dispatch(setLang(lang));
    //   setLoading(false);
    // };

    // dateLocales[formattedLang]()
    //   .then(() => {
    //     dayjs.locale(formattedLang);
    //     dispatchLang();
    //   })
    //   .catch((_) => {
    //     dispatchLang();
    //   });
  };

  return (
    <Dropdown renderTitle={selectedLanguage} placement="bottom-end">
      {sites.length > 0 &&
        sites?.map((lang) => (
          <Dropdown.Item
            className="mb-1 justify-between"
            eventKey={lang._id}
            key={lang._id}
            onClick={() => onLanguageSelect(lang)}
          >
            <span className="flex items-center">
              <span className="ltr:ml-2 rtl:mr-2">{lang?.name}</span>
            </span>
            {locale === lang.value && (
              <HiCheck className="text-emerald-500 text-lg" />
            )}
          </Dropdown.Item>
        ))}
    </Dropdown>
  );
};

export default withHeaderItem(LanguageSelector);
