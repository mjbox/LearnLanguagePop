import sys
import matplotlib.pyplot as plt
import time
import struct

if len(sys.argv) is 1:
  print >> sys.stderr, 'input your file name.'
  exit(1)

fname = sys.argv[1]
data = []
index = 0
try:
  FH = open(fname, 'rb') 
  while True:
    s = FH.read(1)
    if s == '': break
    print s, 
    if index == 1000: break 
    index = index + 1
  FH.close() 
except IOError:
  print >> sys.stderr, 'could not open the file.'