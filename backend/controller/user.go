package controller


import (
		"net/http"
        "github.com/artfifa2012/sa-64-example/entity"
        "github.com/gin-gonic/gin"
		        

)

// POST /users หลัก
func CreateUser(c *gin.Context) {
	
	var user entity.User
	
	// : สร้าง user
	ww := entity.User{
		
		Name: user.Name,	// ตั้งค่าฟิลด์ Name
		Email: user.Email,	// ตั้งค่าฟิลด์ Email
		Password: user.Password, 	
	}

	if err := entity.DB().Create(&ww).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ww})
}


// GET /user/:id

func GetUser(c *gin.Context) {

	var user entity.User

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM users WHERE id = ?", id).Scan(&user).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	c.JSON(http.StatusOK, gin.H{"data": user})

}
// GET /users

func ListUsers(c *gin.Context) {

	var users []entity.User

	if err := entity.DB().Raw("SELECT * FROM users").Scan(&users).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	c.JSON(http.StatusOK, gin.H{"data": users})

}// DELETE /users/:id

func DeleteUser(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {

			c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

			return

	}


	c.JSON(http.StatusOK, gin.H{"data": id})

}// PATCH /users

func UpdateUser(c *gin.Context) {

	var user entity.User

	if err := c.ShouldBindJSON(&user); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	if tx := entity.DB().Where("id = ?", user.ID).First(&user); tx.RowsAffected == 0 {

			c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

			return

	}


	if err := entity.DB().Save(&user).Error; err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return

	}


	c.JSON(http.StatusOK, gin.H{"data": user})

}



/*
// POST /users ทดลอง
func CreateUser(c *gin.Context) {
	var user entity.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// รหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	user.Password = string(bytes)

	if err := entity.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}
*/