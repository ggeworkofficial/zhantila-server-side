import { 
    createCategoryResponse,
    getAllCategoryResponse,
    getOneCategoryResponse,
    updateCategoryResponse,
    deleteCategoryResponse
} from "../../response/category.response";
import { createCategorySchema, getAllCategoriesSchema, getOneCategorySchema, updateCategorySchema } from "../../validators/category.validator";
import { errorResponse } from "../../response/error.response";

export const categoryPaths = {
    "/categories": {
        post: {
            summary: "Create a category",
            requestBody: {
                content: {
                    "application/json": {
                        schema: createCategorySchema
                    }
                }
            }, 
            responses: {
                "201": {
                    description: "Category created successfully",
                    content: {
                        "application/json": {
                            schema: createCategoryResponse
                        }
                    }
                },
                "400": {
                    description: "Invalid request",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "401": {
                    description: "Unauthorized response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "403": {
                    description: "Forbidden response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "404": {
                    description: "Not found response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "500": {
                    description: "Internal server error response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                }
            }
        },
        get: {
            summary: "Get all categories",
            requestParams: {
                query: getAllCategoriesSchema
            },
            responses: {
                "200": {
                    description: "Categories returned successfully",
                    content: {
                        "application/json": { schema: getAllCategoryResponse}
                    }
                },
                "400": {
                    description: "Invalid request",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "401": {
                    description: "Unauthorized response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "403": {
                    description: "Forbidden response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "404": {
                    description: "Not found response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "500": {
                    description: "Internal server error response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                }
            }
            
        },
        
    },

    "/categories/{id}": {
        get: {
            summary: "Get one category",

            requestParams: {
                path: getOneCategorySchema
            },

            responses: {
                "200": {
                    description: "Category returned successfully",
                    content: {
                        "application/json": { schema: getOneCategoryResponse}
                    },
                },
                "400": {
                    description: "Invalid request",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "401": {
                    description: "Unauthorized response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "403": {
                    description: "Forbidden response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "404": {
                    description: "Not found response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "500": {
                    description: "Internal server error response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                }
            }
        },
        put: {
            summary: "Update a category",
            requestParams: {
                path: getOneCategorySchema
            },
            requestBody: {
                content: {
                    "application/json": {
                        schema: updateCategorySchema
                    }
                }
            },
            responses: {
                "200": {
                    description: "Category updated successfully",
                    content: {
                        "application/json": { schema: updateCategoryResponse }
                    }
                },
                "400": {
                    description: "Invalid request",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "401": {
                    description: "Unauthorized response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "403": {
                    description: "Forbidden response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "404": {
                    description: "Not found response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "500": {
                    description: "Internal server error response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Delete a category",
            requestParams: {
                path: getOneCategorySchema
            },
            responses: {
                "200": {
                    description: "Category deleted successfully",
                    content: {
                        "application/json": { schema: deleteCategoryResponse }
                    }
                },
                "400": {
                    description: "Invalid request",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "401": {
                    description: "Unauthorized response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "403": {
                    description: "Forbidden response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "404": {
                    description: "Not found response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                },
                "500": {
                    description: "Internal server error response",
                    content: {
                        "application/json": {
                            schema: errorResponse
                        }
                    }
                }
            }
        },
    },
}
