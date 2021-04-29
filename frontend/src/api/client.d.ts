import {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
  namespace Schemas {
    export interface Task {
      readonly url?: string;
      readonly id?: number;
      order: number;
      title: string;
      description: string;
      task_type: "survey" | "discussion" | "diary";
    }
    export interface Tile {
      readonly url?: string;
      readonly id?: number;
      readonly get_status_display?: string;
      status: "LIVE" | "PEND" | "ARCH";
      launch_date: string; // date-time
      tasks: {
        readonly url?: string;
        readonly id?: number;
        order: number;
        title: string;
        description: string;
        task_type: "survey" | "discussion" | "diary";
      }[];
    }
  }
}
declare namespace Paths {
  namespace CreateTask {
    export type RequestBody = Components.Schemas.Task;
    namespace Responses {
      export type $201 = Components.Schemas.Task;
    }
  }
  namespace CreateTile {
    export type RequestBody = Components.Schemas.Tile;
    namespace Responses {
      export type $201 = Components.Schemas.Tile;
    }
  }
  namespace DestroyTask {
    namespace Parameters {
      export type Id = string;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
  }
  namespace DestroyTile {
    namespace Parameters {
      export type Id = string;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
  }
  namespace ListTasks {
    namespace Responses {
      export type $200 = Components.Schemas.Task[];
    }
  }
  namespace ListTiles {
    namespace Responses {
      export type $200 = Components.Schemas.Tile[];
    }
  }
  namespace PartialUpdateTask {
    namespace Parameters {
      export type Id = string;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = Components.Schemas.Task;
    namespace Responses {
      export type $200 = Components.Schemas.Task;
    }
  }
  namespace PartialUpdateTile {
    namespace Parameters {
      export type Id = string;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = Components.Schemas.Tile;
    namespace Responses {
      export type $200 = Components.Schemas.Tile;
    }
  }
  namespace RetrieveTask {
    namespace Parameters {
      export type Id = string;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.Task;
    }
  }
  namespace RetrieveTile {
    namespace Parameters {
      export type Id = string;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.Tile;
    }
  }
  namespace UpdateTask {
    namespace Parameters {
      export type Id = string;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = Components.Schemas.Task;
    namespace Responses {
      export type $200 = Components.Schemas.Task;
    }
  }
  namespace UpdateTile {
    namespace Parameters {
      export type Id = string;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = Components.Schemas.Tile;
    namespace Responses {
      export type $200 = Components.Schemas.Tile;
    }
  }
}

export interface OperationMethods {
  /**
   * listTiles - API endpoint that allows tiles to be viewed or edited.
   */
  'listTiles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListTiles.Responses.$200>
  /**
   * createTile - API endpoint that allows tiles to be viewed or edited.
   */
  'createTile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTile.Responses.$201>
  /**
   * retrieveTile - API endpoint that allows tiles to be viewed or edited.
   */
  'retrieveTile'(
    parameters?: Parameters<Paths.RetrieveTile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveTile.Responses.$200>
  /**
   * updateTile - API endpoint that allows tiles to be viewed or edited.
   */
  'updateTile'(
    parameters?: Parameters<Paths.UpdateTile.PathParameters> | null,
    data?: Paths.UpdateTile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateTile.Responses.$200>
  /**
   * partialUpdateTile - API endpoint that allows tiles to be viewed or edited.
   */
  'partialUpdateTile'(
    parameters?: Parameters<Paths.PartialUpdateTile.PathParameters> | null,
    data?: Paths.PartialUpdateTile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateTile.Responses.$200>
  /**
   * destroyTile - API endpoint that allows tiles to be viewed or edited.
   */
  'destroyTile'(
    parameters?: Parameters<Paths.DestroyTile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * listTasks - API endpoint that allows tasks to be viewed or edited.
   */
  'listTasks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListTasks.Responses.$200>
  /**
   * createTask - API endpoint that allows tasks to be viewed or edited.
   */
  'createTask'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateTask.Responses.$201>
  /**
   * retrieveTask - API endpoint that allows tasks to be viewed or edited.
   */
  'retrieveTask'(
    parameters?: Parameters<Paths.RetrieveTask.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveTask.Responses.$200>
  /**
   * updateTask - API endpoint that allows tasks to be viewed or edited.
   */
  'updateTask'(
    parameters?: Parameters<Paths.UpdateTask.PathParameters> | null,
    data?: Paths.UpdateTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateTask.Responses.$200>
  /**
   * partialUpdateTask - API endpoint that allows tasks to be viewed or edited.
   */
  'partialUpdateTask'(
    parameters?: Parameters<Paths.PartialUpdateTask.PathParameters> | null,
    data?: Paths.PartialUpdateTask.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PartialUpdateTask.Responses.$200>
  /**
   * destroyTask - API endpoint that allows tasks to be viewed or edited.
   */
  'destroyTask'(
    parameters?: Parameters<Paths.DestroyTask.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
}

export interface PathsDictionary {
  ['/api/v1/tiles/']: {
    /**
     * listTiles - API endpoint that allows tiles to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListTiles.Responses.$200>
    /**
     * createTile - API endpoint that allows tiles to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTile.Responses.$201>
  }
  ['/api/v1/tiles/{id}/']: {
    /**
     * retrieveTile - API endpoint that allows tiles to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveTile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveTile.Responses.$200>
    /**
     * updateTile - API endpoint that allows tiles to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTile.PathParameters> | null,
      data?: Paths.UpdateTile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateTile.Responses.$200>
    /**
     * partialUpdateTile - API endpoint that allows tiles to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateTile.PathParameters> | null,
      data?: Paths.PartialUpdateTile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateTile.Responses.$200>
    /**
     * destroyTile - API endpoint that allows tiles to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyTile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/api/v1/tasks/']: {
    /**
     * listTasks - API endpoint that allows tasks to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListTasks.Responses.$200>
    /**
     * createTask - API endpoint that allows tasks to be viewed or edited.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateTask.Responses.$201>
  }
  ['/api/v1/tasks/{id}/']: {
    /**
     * retrieveTask - API endpoint that allows tasks to be viewed or edited.
     */
    'get'(
      parameters?: Parameters<Paths.RetrieveTask.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RetrieveTask.Responses.$200>
    /**
     * updateTask - API endpoint that allows tasks to be viewed or edited.
     */
    'put'(
      parameters?: Parameters<Paths.UpdateTask.PathParameters> | null,
      data?: Paths.UpdateTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateTask.Responses.$200>
    /**
     * partialUpdateTask - API endpoint that allows tasks to be viewed or edited.
     */
    'patch'(
      parameters?: Parameters<Paths.PartialUpdateTask.PathParameters> | null,
      data?: Paths.PartialUpdateTask.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PartialUpdateTask.Responses.$200>
    /**
     * destroyTask - API endpoint that allows tasks to be viewed or edited.
     */
    'delete'(
      parameters?: Parameters<Paths.DestroyTask.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
