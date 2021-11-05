import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบสมาชิก</h1>
        <h4>Requirements</h4>
        <p>
        ระบบ Farmmart เป็นระบบที่ให้สมาชิกในระบบสามารถ Login เพื่อเข้าใช้งานและสั่งซื้อสินค้า 
        สมาชิกสามารถค้นหาสินค้าที่สนใจ  และตรวจสอบจำนวนสินค้าที่มีในสต๊อกก่อนทำการสั่งซื้อ ระบบ Farm mart 
        ยังแบ่งสินค้าตามหมวดหมู่เพื่อให้ง่ายต่อการค้นหา แล้วยังสามารถสั่งจองสินค้าหรือผลผลิตล่วงหน้าได้ 
 	    อีกทั้งยังมี ระบบสมาชิก ที่คอยเก็บ ข้อมูลส่วนตัว ของสมาชิก อย่าง เพศ ช่องทางการติดต่อ การเคยเป็นสมาชิก  และ ศาสนา 
        เพื่อให้ Farm mart ใช้เป็นข้อมูลในการยืนยันตัวตนเพื่อใช้ในการสั่งซื้อสินค้า
 
        </p>
      </Container>
    </div>
  );
}
export default Home;