//refreshing pages

const refreshOrderService = async (loginname) => {
    return `/order?loginname=${loginname}`;
  };
  
  const refreshMenuService = async (loginname) => {
    return `/rdashboard/?loginname=${loginname}#menu`;
  };
  
  module.exports = { refreshOrderService, refreshMenuService };