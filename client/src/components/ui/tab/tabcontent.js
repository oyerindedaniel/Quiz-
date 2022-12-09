const TabContent = ({ id, activeTab, children }) =>
  activeTab === id ? <div>{children}</div> : null;

export default TabContent;
