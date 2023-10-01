import React from "react";
import { EmployeeSchema } from "../schemas";
import { DBName, StoreName } from "../constant";

export const IDBContext = React.createContext<{
  IDBInstance?: IDBDatabase;
  addEmployee: (data: EmployeeSchema) => IDBRequest<IDBValidKey> | undefined;
  updateEmployee: (data: EmployeeSchema) => IDBRequest<IDBValidKey> | undefined;
  getAllEmployee: () => IDBRequest<EmployeeSchema[]> | undefined;
  getIndividualEmployee: (id: number) => IDBRequest<EmployeeSchema> | undefined;
  deleteEmployee: (data: EmployeeSchema) => IDBRequest<IDBValidKey> | undefined;
}>({
  IDBInstance: undefined,
  addEmployee: () => undefined,
  getAllEmployee: () => undefined,
  getIndividualEmployee: () => undefined,
  updateEmployee: () => undefined,
  deleteEmployee: () => undefined,
});

const IndexDB = window.indexedDB;

export function DBContextProvider({ children }: React.PropsWithChildren): React.JSX.Element {
  const [IDBInstance, setIDBInstance] = React.useState<IDBDatabase>();

  React.useMemo(() => {
    const empDB = IndexDB.open(DBName, 2);

    empDB.onerror = function (this, _ev) {
      console.error(`DB creation failed: ${this.error?.message}`);
    };

    empDB.onupgradeneeded = function (this, _ev) {
      this.result.createObjectStore(StoreName, {
        keyPath: "id",
        autoIncrement: true,
      });
    };

    empDB.onsuccess = function (this, _ev) {
      setIDBInstance(this.result);
    };
  }, []);

  function addEmployee(data: EmployeeSchema): IDBRequest<IDBValidKey> | undefined {
    if (IDBInstance !== undefined) {
      const out = EmployeeSchema.parse(data);
      const transaction = IDBInstance.transaction(StoreName, "readwrite");
      const instance = transaction.objectStore(StoreName);
      return instance?.add(out);
    }
    return undefined;
  }

  function getAllEmployee(): IDBRequest<EmployeeSchema[]> | undefined {
    if (IDBInstance !== undefined) {
      const transaction = IDBInstance.transaction(StoreName, "readwrite");
      const instance = transaction.objectStore(StoreName);
      return instance?.getAll();
    }
    return undefined;
  }

  function getIndividualEmployee(id: number): IDBRequest<EmployeeSchema> | undefined {
    if (IDBInstance !== undefined) {
      const transaction = IDBInstance.transaction(StoreName, "readwrite");
      const instance = transaction.objectStore(StoreName);
      return instance?.get(id);
    }
    return undefined;
  }

  function updateEmployee(data: EmployeeSchema): IDBRequest<IDBValidKey> | undefined {
    const out = EmployeeSchema.parse(data);
    if (IDBInstance !== undefined && out.id !== undefined) {
      const transaction = IDBInstance.transaction(StoreName, "readwrite");
      const instance = transaction.objectStore(StoreName);
      return instance?.put(data);
    }
    return undefined;
  }
  function deleteEmployee(data: EmployeeSchema): IDBRequest<IDBValidKey> | undefined {
    const out = EmployeeSchema.parse(data);
    if (IDBInstance !== undefined && out.id !== undefined) {
      const transaction = IDBInstance.transaction(StoreName, "readwrite");
      const instance = transaction.objectStore(StoreName);
      return instance?.put({ ...out, isDeleted: true });
    }
    return undefined;
  }

  return (
    <IDBContext.Provider
      value={{
        IDBInstance,
        addEmployee,
        getAllEmployee,
        getIndividualEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </IDBContext.Provider>
  );
}
