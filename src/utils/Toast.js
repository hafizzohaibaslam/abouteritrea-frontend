const toastConfig = {
  isClosable: true,
  position: "top",
  containerStyle: {
    width: "98%",
  },
};

// Toast.js
class MyToast {
  constructor(useToast) {
    this.toast = useToast;
  }

  error(msg, duration = 2000) {
    return this.toast({
      title: msg,
      status: "error",
      duration: duration,
      ...toastConfig,
    });
  }

  success(msg, duration = 2000) {
    return this.toast({
      title: msg,
      status: "success",
      duration: duration,
      ...toastConfig,
    });
  }
  warning(msg, duration = 2000) {
    return this.toast({
      title: msg,
      status: "warning",
      duration: duration,
      ...toastConfig,
    });
  }
}

export default MyToast;
