using CoreDAL.MultiTenancy.TenantUser.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace CoreDAL.Models
{
    [Table("TENANT_USER")]
    public class TenantUser
    {
        private const int SALT_SIZE = 24;
        [Key]
        [MaxLength(450)]
        public string ID { get; set; }
        [ForeignKey("Tenant")]
        
        [NotMapped]
        public string TENANT_CODE { get; set; }
        [Required]
        [MaxLength(150)]
        public string USER_NAME { get; set; }
        public bool? IS_PORTAL { get; set; }
        public bool? IS_WEBAPP { get; set; }
        public int? GROUP_ID { get; set; }
        [NotMapped]
        public int? GROUP_OLD_ID { get; set; }
        [Required]
        [MaxLength(150)]
        public string USER_NAME_REF { get; set; }
        [MaxLength(100)]
        public string EMAIL { get; set; }
        [MaxLength(100)]
        public string FULLNAME { get; set; }
        [MaxLength(100)]
        public string EMPLOYEE_CODE { get; set; }
        [MaxLength(100)]
        public string EMPLOYEE_NAME { get; set; }

        [MaxLength(150)]
        public string AVATAR { get; set; }
        [DefaultValue(true)]
        public bool IS_FIRST_LOGIN { get; set; } // lan dau dang nhap
        public int? EMP_ID { get; set; }
        [MaxLength(450)]
        public string FCM_TOKEN { get; set; }
        [MaxLength(450)]
        public string REFRESH_TOKEN { get; set; }
        [Required]
        [MaxLength(450)]
        public string PASSWORD_HASH { get; set; }
        /// <summary>
        /// Đặt password, tự động mã hóa
        /// </summary>
        public string PASSWORD
        {
            set
            {
                GeneratePasswordHash(value);
            }
        }
        [Required]
        [MaxLength(450)]
        public string SALT { get; set; }
        public bool IS_LOCK { get; set; }
        public bool DEL { get; set; }
        [MaxLength(450)]
        public string DEVICE_ID { get; set; }
        [Required]
        public bool IS_ADMIN { get; set; }

        /// <summary>
        /// Sinh ngẫu nhiên chuỗi Salt
        /// </summary>
        /// <returns></returns>
        private string GenerateSaltString()
        {
            RNGCryptoServiceProvider mCrypto = new RNGCryptoServiceProvider();
            // tạo mảng byte chứa salt
            byte[] saltBytes = new byte[SALT_SIZE];

            // tạo ngẫu nhiên mảng salt các con số khác 0 vào mảng byte
            mCrypto.GetNonZeroBytes(saltBytes);

            // chuyển byte thành string và trả về
            return Convert.ToBase64String(saltBytes);
        }

        /// <summary>
        /// Mã hóa mật khẩu
        /// </summary>
        /// <param name="password">Mật khẩu</param>
        private void GeneratePasswordHash(string password)
        {
            // Tạo salt ngẫu nhiên và gán trả về
            this.SALT = GenerateSaltString();

            // Thêm salt vào cuối chuỗi mật khẩu
            password += SALT;

            // Mã hóa mật khẩu và trả về
            this.PASSWORD_HASH = GetPasswordHashAndSalt(password);
        }

        /// <summary>
        /// Mã hóa mật khẩu (đã kèm theo Salt), sử dụng thuật toán SHA256
        /// </summary>
        /// <param name="passwordWithSalt">Mật khẩu đã chứa salt</param>
        /// <returns>Trả về mật khẩu đã mã hóa</returns>
        private string GetPasswordHashAndSalt(string passwordWithSalt)
        {
            // sử dụng thuật toán SHA256 để mã hóa mật khẩu
            SHA256 sha = new SHA256CryptoServiceProvider();
            byte[] dataBytes = Encoding.ASCII.GetBytes(passwordWithSalt);
            byte[] resultBytes = sha.ComputeHash(dataBytes);

            // trả về chuỗi hash
            return Convert.ToBase64String(resultBytes);
        }

        /// <summary>
        /// Kiểm tra mật khẩu có khớp
        /// </summary>
        /// <param name="password">Mật khẩu chưa mã hóa</param>
        /// <returns>Trả về true nếu mật khẩu khớp, và ngược lại</returns>
        public bool IsPasswordMath(string password, bool alreadyHashed = false)
        {
            string finalString = password;
            if (!alreadyHashed)
            {
                finalString += SALT;
                finalString = GetPasswordHashAndSalt(finalString);
            }

            return this.PASSWORD_HASH == finalString;
        }


    }

    [Table("SYS_USER_ORG")]
    public class UserOrgani
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public string USER_ID { get; set; }
        public int ORG_ID { get; set; }
    }
    [Table("SYS_USER_GROUP_ORG")]
    public class UserGroupOrgani
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        public int GROUP_ID { get; set; }
        public int ORG_ID { get; set; }
    }

    [Table("TENANT_USER_TMP")]
    public class TenantUserTmp
    {
        private const int SALT_SIZE = 24;
        [Key]
        [MaxLength(450)]
        public string ID { get; set; }
        
        [Required]
        [MaxLength(150)]
        public string USER_NAME { get; set; }
        [MaxLength(250)]
        public string FULL_NAME { get; set; }
        public bool? IS_PORTAL { get; set; }
        public bool? IS_WEBAPP { get; set; }
        public bool? IS_EXISTS { get; set; }
        [MaxLength(250)]
        public string GROUP_NAME { get; set; }

        public string EMP_CODE { get; set; }
        [Required]
        [MaxLength(450)]
        public string PASSWORD_HASH { get; set; }
        /// <summary>
        /// Đặt password, tự động mã hóa
        /// </summary>
        public string PASSWORD
        {
            set
            {
                GeneratePasswordHash(value);
            }
        }
        [Required]
        [MaxLength(450)]
        public string SALT { get; set; }

        /// <summary>
        /// Sinh ngẫu nhiên chuỗi Salt
        /// </summary>
        /// <returns></returns>
        private string GenerateSaltString()
        {
            RNGCryptoServiceProvider mCrypto = new RNGCryptoServiceProvider();
            // tạo mảng byte chứa salt
            byte[] saltBytes = new byte[SALT_SIZE];
            // tạo ngẫu nhiên mảng salt các con số khác 0 vào mảng byte
            mCrypto.GetNonZeroBytes(saltBytes);
            // chuyển byte thành string và trả về
            return Convert.ToBase64String(saltBytes);
        }

        /// <summary>
        /// Mã hóa mật khẩu
        /// </summary>
        /// <param name="password">Mật khẩu</param>
        private void GeneratePasswordHash(string password)
        {
            // Tạo salt ngẫu nhiên và gán trả về
            this.SALT = GenerateSaltString();
            // Thêm salt vào cuối chuỗi mật khẩu
            password += SALT;
            // Mã hóa mật khẩu và trả về
            this.PASSWORD_HASH = GetPasswordHashAndSalt(password);
        }

        /// <summary>
        /// Mã hóa mật khẩu (đã kèm theo Salt), sử dụng thuật toán SHA256
        /// </summary>
        /// <param name="passwordWithSalt">Mật khẩu đã chứa salt</param>
        /// <returns>Trả về mật khẩu đã mã hóa</returns>
        private string GetPasswordHashAndSalt(string passwordWithSalt)
        {
            // sử dụng thuật toán SHA256 để mã hóa mật khẩu
            SHA256 sha = new SHA256CryptoServiceProvider();
            byte[] dataBytes = Encoding.ASCII.GetBytes(passwordWithSalt);
            byte[] resultBytes = sha.ComputeHash(dataBytes);
            // trả về chuỗi hash
            return Convert.ToBase64String(resultBytes);
        }
    }
}
