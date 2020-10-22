import React, { useState, useEffect } from "react";
import Notice from "../../utils/notice";

const TableContext = React.createContext({});

const TableProvider = (props) => {
  const [crud, setCrud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    hideSingle: true,
  });
  const [query, setQuery] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [values, setValues] = useState({});

  const [hooks, setHooks] = useState({
    init: () => {
    },
    beforeQuery: (query) => {
      return { ...query };
    },
    beforeSave: (params) => {
      return { ...params };
    },
    afterToEdit: (params) => {
      return { ...params };
    },
  });

  const { page } = pagination;
  useEffect(() => {
    if (crud) {
      doQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crud, query, page]);

  const pageChange = (current, filters, sorter) => {
    setPagination({ ...pagination, page: current });
  };

  const toAdd = () => {
    setValues({});
    setShowModal(true);
    setModalType("create");
  };

  const toEdit = (id) => {
    crud.get(id).then((res) => {
      const { success, content, message } = res;
      if (success) {
        setShowModal(true);
        setModalType("update");
        setValues(hooks.afterToEdit(content));
      } else {
        Notice.open({ type: "error", title: "操作失败", message });
      }
    });
  };

  const doQuery = () => {
    setLoading(true);
    const { page, size } = pagination;
    const params = { criteria: hooks.beforeQuery(query), page, size };
    crud.fetch(params).then((res) => {
      setLoading(false);
      const { content } = res;
      setList(content.data);
      const { page, size, total } = content;
      setPagination({ ...pagination, page, size, total });
    });
  };

  const save = (params) => {
    let data = hooks.beforeSave(params);
    const { id } = values;
    if (id) {
      data = { ...data, id };
    }

    crud.save(data).then((res) => {
      const { success, message } = res;
      if (success) {
        setValues({});
        Notice.open();
        doQuery();
        hooks.init();
      } else {
        Notice.open({ type: "error", title: "操作失败", message });
      }
    });
  };

  const remove = (params) => {
    crud.remove(params).then((res) => {
      const { success, message } = res;
      if (success) {
        Notice.open();
        doQuery();
      } else {
        Notice.open({ type: "error", title: "操作失败", message });
      }
    });
  };

  return (
    <TableContext.Provider
      value={{
        list,
        loading,
        pagination,
        setPagination,
        pageChange,
        setCrud,
        setQuery,
        toAdd,
        toEdit,
        save,
        remove,
        setHook: (params) => {
          setHooks({ ...hooks, ...params });
        },
        showModal,
        setShowModal,
        modalType,
        values,
      }}
    >
      {props.children}
    </TableContext.Provider>
  );
};

const TableConsumer = TableContext.Consumer;
export const withTableConsumer = (Comment) => {
  return (props) => {
    return (
      <TableConsumer>
        {(value) => {
          return <Comment {...props} context={value} />;
        }}
      </TableConsumer>
    );
  };
};

export { TableProvider, TableContext };
