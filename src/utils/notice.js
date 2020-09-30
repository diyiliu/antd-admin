import { notification } from "antd";

const openNotification = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

class Notice {
  static open(props) {
    const { type = "success", title = "操作成功", message = "" } = props;
    openNotification(type, title, message);
  }
}

export default Notice;
