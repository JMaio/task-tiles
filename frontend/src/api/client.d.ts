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
      readonly id?: number;
      order: number;
      title: string;
      description: string;
      task_type: "survey" | "discussion" | "diary";
    }
    export interface Tile {
      readonly id?: number;
      readonly get_status_display?: string;
      launch_date: string; // date-time
      tasks: {
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
   * retrieveTile - API endpoint that allows tiles to be viewed or edited.
   */
  'retrieveTile'(
    parameters?: Parameters<Paths.RetrieveTile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveTile.Responses.$200>
  /**
   * listTasks - API endpoint that allows tasks to be viewed or edited.
   */
  'listTasks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListTasks.Responses.$200>
  /**
   * retrieveTask - API endpoint that allows tasks to be viewed or edited.
   */
  'retrieveTask'(
    parameters?: Parameters<Paths.RetrieveTask.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RetrieveTask.Responses.$200>
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
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
