import classes from "./tabnavitem.module.css";

const TabNavItem = ({ id, activeTab, title, setActiveTab, activeStyle }) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  //   cursor="pointer"
  //   onClick={handleClick}
  //   position="relative"
  //   transition="all 100ms ease"
  //   sx={{ ...defaultStyle, ...(activeTab === id && activeStyle) }}
  //   _hover={activeTab === id ? "" : hoverStyle}

  return (
    <li
      onClick={handleClick}
      className={`${classes.tabNavItem} ${
        activeTab === id && classes.activeTabNavItem
      }`}
    >
      {title}
    </li>
  );
};
export default TabNavItem;
