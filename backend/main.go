package main


import (

  "github.com/artfifa2012/sa-64-example/controller"
  "github.com/artfifa2012/sa-64-example/entity"
  "github.com/artfifa2012/sa-64-example/middlewares"

  "github.com/gin-gonic/gin"

)
func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
		
			// User Routes
			r.GET("/users", controller.ListUsers)
			r.GET("/user/:id", controller.GetUser)
			r.PATCH("/users", controller.UpdateUser)
			r.DELETE("/users/:id", controller.DeleteUser)

			// Contact Routes
			r.GET("/contacts", controller.ListContacts)
			r.GET("/contact/:id", controller.GetContact)
			r.POST("/contacts", controller.CreateContact)
			r.PATCH("/contacts", controller.UpdateContact)
			r.DELETE("/contacts/:id", controller.DeleteContact)

			// Sex Routes
			r.GET("/sexs", controller.ListSexs)
			r.GET("/sex/:id", controller.GetSex)
			r.POST("/sexs", controller.CreateSex)
			r.PATCH("/sexs", controller.UpdateSex)
			r.DELETE("/sexs/:id", controller.DeleteSex)

			// Olduser Routes
			r.GET("/oldusers", controller.ListOldusers)
			r.GET("/olduser/:id", controller.GetOlduser)
			r.POST("/oldusers", controller.CreateOlduser)
			r.PATCH("/oldusers", controller.UpdateOlduser)
			r.DELETE("/oldusers/:id", controller.DeleteOlduser)

      		// Religion Routes
			r.GET("/religions", controller.ListReligions)
			r.GET("/religion/:id", controller.GetReligion)
			r.POST("/religions", controller.CreateReligion)
			r.PATCH("/religions", controller.UpdateReligion)
			r.DELETE("/religions/:id", controller.DeleteReligion)

			// Account Routes
			r.GET("/accounts", controller.ListAccounts)
			r.GET("/account/:id", controller.GetAccount)
			r.POST("/accounts", controller.CreateAccount)
			r.PATCH("/accounts", controller.UpdateAccount)
			r.DELETE("/accounts/:id", controller.DeleteAccount)

		}
	}

	// User Routes
	r.POST("/users", controller.CreateUser)

	// Authentication Routes
	r.POST("/login", controller.Login)


	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

