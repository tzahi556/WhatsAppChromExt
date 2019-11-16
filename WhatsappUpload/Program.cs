using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.IO;
using System.Configuration;

namespace WhatsappUpload
{
    class Program
    {

        public static string ImageFolder = ConfigurationManager.AppSettings["ImagesFolder"];
        static void Main(string[] args)
        {
            bool IsOk = false;
            string[] fileEntries = Directory.GetFiles(ImageFolder);
           
            foreach (string fileName in fileEntries)
            {

                 IsOk = UploadToFtp(fileName);

                if(IsOk) File.Delete(fileName);
            }

            //Console.WriteLine(fileEntries.Length);
           // Console.ReadLine();

            if (IsOk)
            {


                try
                {

                    using (var client = new HttpClient())
                    {

                        //Console.Write("Enter Name: ");
                        //string name = Console.ReadLine();
                        string apiUrl = ConfigurationManager.AppSettings["GoHurryApiGet"];

                        client.BaseAddress = new Uri(apiUrl);
                        //HTTP GET
                        var responseTask = client.GetStringAsync("Whatsapp");
                        responseTask.Wait();

                        var result = responseTask.Result;

                        //Console.Write(result);
                        //Console.ReadLine();
                    }

                }
                catch (Exception ex)
                {


                }
            }

        }
        private static bool UploadToFtp(string fileName)
        {
            string ftpServerIP = ConfigurationManager.AppSettings["FtpServer"];
          //  string ImageLink = fileName;

            FileInfo fileInf = new FileInfo(fileName);


            string FtpWhatsappFolder = ConfigurationManager.AppSettings["FtpWhatsappFolder"];

            string uri = "ftp://" + ftpServerIP + "/" + FtpWhatsappFolder + fileInf.Name;

            FtpWebRequest reqFTP;

            // Create FtpWebRequest object from the Uri provided

            reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri(uri));

            // Provide the WebPermission Credintials

            reqFTP.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["FtpUserName"], ConfigurationManager.AppSettings["FtpPassword"]);

            // By default KeepAlive is true, where the control connection is not closed

            // after a command is executed.

            reqFTP.KeepAlive = false;

            // Specify the command to be executed.

            reqFTP.Method = WebRequestMethods.Ftp.UploadFile;

            // Specify the data transfer type.

            reqFTP.UseBinary = true;

            reqFTP.UsePassive = false;

            // Notify the server about the size of the uploaded file

            reqFTP.ContentLength = fileInf.Length;

            // The buffer size is set to 2kb

            int buffLength = 2048;

            byte[] buff = new byte[buffLength];

            int contentLen;

            // Opens a file stream (System.IO.FileStream) to read the file to be uploaded

            FileStream fs = fileInf.OpenRead();

            try

            {

                // Stream to which the file to be upload is written

                Stream strm = reqFTP.GetRequestStream();

                // Read from the file stream 2kb at a time

                contentLen = fs.Read(buff, 0, buffLength);

                // Until Stream content ends

                while (contentLen != 0)
                {

                    // Write Content from the file stream to the FTP Upload Stream

                    strm.Write(buff, 0, contentLen);

                    contentLen = fs.Read(buff, 0, buffLength);

                }

                // Close the file stream and the Request Stream

                strm.Close();

                fs.Close();

                return true;

            }

            catch (Exception ex)
            {

                Console.WriteLine(ex.Message, "Upload Error");

                return false;

            }

        }

        public static void UploadMultipart(string filePath, string filename, string contentType, string url)
        {

            byte[] file = System.IO.File.ReadAllBytes(filePath);




            var webClient = new WebClient();
            string boundary = "------------------------" + DateTime.Now.Ticks.ToString("x");
            webClient.Headers.Add("Content-Type", "multipart/form-data; boundary=" + boundary);
            var fileData = webClient.Encoding.GetString(file);
            var package = string.Format("--{0}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{1}\"\r\nContent-Type: {2}\r\n\r\n{3}\r\n--{0}--\r\n", boundary, filename, contentType, fileData);

            var nfile = webClient.Encoding.GetBytes(package);

            byte[] resp = webClient.UploadData(url, "POST", nfile);
        }
    }
}
