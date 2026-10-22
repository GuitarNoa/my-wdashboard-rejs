# รีวิวโค้ดและดีไซน์ — 22 ตุลาคม 2026

## ขอบเขต

ตรวจ App/routing, layout/navigation, theme, shared components และทั้ง 28 หน้า: Dashboard, eCommerce, CRM, Profile, Settings, auth, forms, tables, charts, UI examples, Pricing, FAQ และ Error พร้อมตรวจ build/config และเอกสารการใช้งาน

เป้าหมายรอบนี้คือ frontend demo ที่ใช้งานได้ชัดเจนและสม่ำเสมอ ไม่ได้เพิ่ม backend, authentication หรือระบบชำระเงินจริง

## สิ่งที่พบและแก้ไข

| ระดับ | ปัญหาเดิม | การแก้ไข |
| --- | --- | --- |
| P1 | Login/Register เป็น form ที่ไม่มี submit handler อาจ reload และไม่ตรวจข้อมูลตาม flow | รวม AuthForm ใช้ validation, ป้องกัน default submit, ล้างรหัสผ่านหลังตรวจ และแจ้งว่าไม่มีการสร้างบัญชี/เข้าสู่ระบบ |
| P1 | CRM ใช้ปุ่ม Save นอก form ทำให้ type=email ไม่ตรวจข้อมูล | ใช้ form submit, required/label และ dialog ที่รองรับ Escape/focus พร้อมค้นหาลูกค้า |
| P2 | กราฟบางหน้าอาศัย controller ที่ register จากหน้าอื่น; effects มี dependency ไม่ครบ | register ในหน้าที่ใช้งาน, เปลี่ยนเป็น scriptable gradient ตามขนาด chartArea, ตัดข้อมูลสุ่มเพื่อให้ผลคงที่ |
| P2 | โหลดทุกหน้าตั้งแต่เปิดแอป รวมโค้ด Faker สำหรับข้อมูลเดโม | lazy-load ทั้ง 28 หน้า, ตัด Faker imports ที่ใช้สร้างกราฟ, มี loading state |
| P2 | Add/Edit สินค้าเป็นปุ่มว่าง และ fixed grid ล้นมือถือ | เพิ่มฟอร์มสินค้าพร้อมตรวจชื่อ/ราคา/stock, responsive grid, undo delete; จำนวนกลางกราฟอ่านจาก options ล่าสุด |
| P2 | ตาราง sort ได้ด้วยเมาส์เท่านั้น; dark mode อ่านยาก | ใช้ปุ่มใน header และ aria-sort, dark styles, empty state, pagination และ undo delete |
| P2 | Wizard กด Enter ข้าม validation; feedback ใช้ alert | validation ตามขั้น, inline status/errors, label/help text, review ปิดบังรหัสผ่าน |
| P2 | เมนูมี contrast ต่ำ, ย่อแล้วอาศัย hover, เมนู/ค้นหามีข้อมูลซ้ำ | sidebar slate/teal, ปุ่มขยายที่ใช้คีย์บอร์ดได้, เมนู/ค้นหาใช้ข้อมูลเดียวกัน, mobile focus trap/restore และ skip link |
| P2 | Pricing/FAQ ทำให้เข้าใจว่ามี billing/account service | ปุ่ม preview พร้อมข้อความตามจริง และ FAQ อธิบายข้อจำกัดของเดโม |
| P2 | tabs ขาด keyboard navigation; breadcrumb/footer มีลิงก์ว่าง | รองรับ Arrow/Home/End และ ARIA, ใช้ route ที่มีจริงแทน placeholder |
| P3 | ขนาดตัวอักษร การ์ด สี และ spacing ไม่สม่ำเสมอ | ปรับ surfaces เป็น slate/teal, shared form styles, typography Inter แบบ local, responsive/dark styles และ reduced-motion |

Dashboard เปลี่ยน banner ที่ไม่เกี่ยวข้องเป็นทางลัดไป CRM, Inventory และ Profile; ปุ่ม Edit project ที่ไม่มีการทำงานถูกนำออก และเพิ่ม undo หลังลบ

## ผลตรวจ

- ESLint ทั้งโปรเจกต์: ผ่าน ไม่มี error/warning
- Production build: ผ่าน; แยก route chunks และไม่มีคำเตือน chunk เกิน 500 kB
- Render smoke checks: 28 หน้าใน light/dark states รวม 56 renders ผ่าน
- ตรวจ navigation targets, validation, gradient cache/resize, Profile JSON ที่เสีย และ URL protocol ที่ไม่ปลอดภัย: ผ่าน
- Edge headless: เปิดครบ 28 routes ที่ desktop 1440px/light และ mobile 390px/dark; ไม่พบ runtime page errors หรือ horizontal overflow ของหน้า
- Browser interactions: mobile sidebar Escape, ค้นหาหน้า, แก้ Profile และ reload, ตารางค้นหาจากหน้าที่ 2/ไม่มีผลลัพธ์, เพิ่ม/ลบ/undo สินค้า และเพิ่มลูกค้า: ผ่าน
- ตรวจภาพ desktop/mobile ของ Dashboard และเก็บภาพ Profile ใน `review-artifacts/`

การทดสอบข้างต้นไม่ใช่ full accessibility audit, cross-browser certification, penetration test หรือ dependency vulnerability scan

## สิ่งที่ยังต้องทำก่อนใช้กับข้อมูลจริง

1. **P1 — ไม่มี authentication/authorization/backend**: `src/pages/auth/AuthForm.jsx:45` ระบุเป็น demo; ทุก route ยังเป็น public ต้องออกแบบ server-side permissions และ session ก่อนใช้ข้อมูลส่วนบุคคลจริง
2. **P1 — Business records ยังไม่ถาวร**: CRM, inventory, projects และ users ใช้ state ในหน้า การเปลี่ยนหน้า/reload จะคืนข้อมูลเดโม ต้องเพิ่ม API/database พร้อม loading/error/retry และ validation ฝั่ง server
3. **P2 — Profile และ Settings เป็นตัวอย่างแยกกัน**: เก็บคนละ localStorage key และไม่ sync หลายอุปกรณ์ หากใช้จริงควรมี user model เดียวและจัดการข้อมูลจาก server
4. **P2 — รูป Profile ใหญ่กว่าที่แสดงมาก**: `src/assets/my_profile.jpg` ประมาณ 3.20 MB; ควรเตรียม avatar ขนาดเหมาะสมเป็น WebP/AVIF พร้อม responsive source ก่อนเผยแพร่
5. **P2 — Deployment recovery**: ต้องตั้ง SPA fallback ไป index.html สำหรับ direct URLs; ควรเพิ่ม error boundary/reload recovery สำหรับ network หรือ lazy chunk ล้มเหลว และเชื่อม monitoring

## แนวทางดีไซน์

- สีหลัก teal-700 สำหรับ action/selection; slate สำหรับข้อความและพื้นหลัง; สีแดงใช้กับการลบ/error
- ข้อมูลหลักขึ้นก่อน, การ์ดตัวเลขอ่านง่าย, quick actions แยกจากกราฟ
- หน้ามือถือเรียงเป็นคอลัมน์เดียว; ตารางเลื่อนภายในกรอบ ไม่ดันทั้งหน้า
- ฟอร์มมี label, validation และข้อความผลลัพธ์ในหน้า; ไม่แสดงความสำเร็จที่ระบบยังทำไม่ได้
- คง URL เดิมทั้งหมดเพื่อไม่ทำให้ลิงก์เก่าเสีย
