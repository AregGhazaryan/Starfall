<p align="center">
<img width="220" height="220" src="https://user-images.githubusercontent.com/38076644/219511701-0510f176-e1d3-4acf-9ed7-4ac451cc41f5.png"/>
</p>

# Starfall

Starfall is a stress testing tool designed to test HTTP API endpoints and also determine if the rate limit has been exceeded. There are some tools like Apache JMeter or artillery, but they turn out to be clunky or hard to use, this is why i created Starfall which has a very simple GUI and its easy to use. It allows the user to input the HTTP method, URL, frequency, multiplier, and number of threads to run the test on.

## How to Use

1. Download and install Starfall.
2. Launch the Starfall application.
3. Enter the HTTP method, URL, multiplier, and number of threads.
4. Click on the "Charge" button to begin the stress test.

Starfall will run the stress test and show the results of the request in a table below the form, if 429 status code will be returned it will stop the test automatically showing a small warning sign.

![Animation](https://user-images.githubusercontent.com/38076644/219512159-66a17ff1-4793-4260-9e13-779dd5272c46.gif)


## Notice

Please note that Starfall is designed for testing purposes only and should not be used with malicious intent. Unauthorized use of this tool to stress test systems that do not belong to you can result in legal consequences. Use Starfall responsibly and ethically.

