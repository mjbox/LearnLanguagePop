import sys
import matplotlib.pyplot as plt
import time
import struct

if len(sys.argv) is 1:
  print >> sys.stderr, 'input your file name.'
  exit(1)

fname = sys.argv[1]
index = 0
row = -1
data = []
byte = [0,0,0,0]
try:
  FH = open(fname, 'rb') 

  while True:
    s = FH.read(1)
    if s == '': break
    #print '%02X' % int(ord(s)), 
    byte[(index%4)] = s
    if (index%44100) == 0:
        data.append([])
        row = row+1
    if row == 100: break
    if (index%4) == 3:
        f = struct.unpack('>f', bytearray(byte))
        data[row].append(f)
    index = index+1
  FH.close() 
except IOError:
  print >> sys.stderr, 'could not open the file.'

fig = plt.figure()
plt.ylabel('some numbers')
plt.show()
r = 0
while r < row:
    plt.figure().clf()
    plt.plot(data[r])
    plt.draw()
    plt.pause(1e-17)
    time.sleep(0.1)
    r = r+1

