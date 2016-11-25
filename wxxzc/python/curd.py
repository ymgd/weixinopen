#!E:\Py\python.exe
# -*- coding: UTF-8 -*-
print "Content-type:text/html"
print 
import MySQLdb as mdb
 
class myMySQL:  
	
    def __init__(self,host="localhost",user="root",pwd="root",database="python",autocommit=False):  
        try:  
            self.isConnect = False  
  
            self.conn = mdb.connect( host, user,  
                pwd, database,charset="gbk");  
  
            self.isConnect = True  
  
            self.cursor = self.conn.cursor(cursorclass = mdb.cursors.DictCursor)  
            self.cursor.execute("SELECT VERSION()")  
  
            data = self.cursor.fetchone()  
  
            if autocommit:  
                self.conn.autocommit(True)  
            else:  
                self.conn.autocommit(False)  

        except mdb.Error as e:  
            print ( "Connect Error %d: %s" % (e.args[0],e.args[1]) )  
   
  
    def close(self):  
        try:  
            self.cursor.close()  
            self.conn.close()  
        except mdb.Error as e:  
            print ( "Close Error %d: %s" % (e.args[0],e.args[1]) )  
  
    def excute(self,sql=""):  
        try:  
            self.cursor.execute(sql)  
        except mdb.Error as e:  
            print ( "Excute Error %d: %s" % (e.args[0],e.args[1]) )  
            print ( "Excute sql= %s" % sql )  
  
    def getrows(self,sql):  
        try:  
            self.excute(sql)  
            rows = self.cursor.fetchall()  
            return rows  
        except mdb.Error as e:  
            print ( "getrows Error %d: %s" % (e.args[0],e.args[1]) )    
			
    def insert(self,sql):
		self.excute(sql)
		self.commit()
		return 'ok'	
    def selectDB(self,dbName):  
        self.conn.select_db(dbName)  
  
    def commit(self):  
        self.conn.commit()  
  
    def rollback(self):  
        self.conn.rollback()  
  
    def setautocommit(self,auto=False):  
        self.conn.autocommit(auto)  
  
    def isConnected(self):   
        return self.isConnect  
  
