### 1. url

put : create, update
get : get data
delete

- indexing: sẽ tạo ra index để truy tìm dữ liệu -> tương tự như create db record

  - **mapping**: tạo ra 1 record trong DB thì cũng mapping vào server elasticsearch

  1. index: ->Document:
     - field
     - mapping type: data type
     - mapping defintion ??????
  2. cluster and node
     - là máy chủ node. có tên mặc định **elasticsearch**
  3. Shards vs Replicas:

  - việc tìm kiếm 1 index có quá nhiều data khiến hardware không đáp ứng đc
    or có quá nhiều data khiến giảm hiệu năng -> chia index thành `shard`

  * `shards`: được coi là 1 index độc lập không khác gì index???
    - Cho phép horizontally scale
    - Cho phép tính toán phân tán và song song đồng thời trên các shards => tăng hiệu năng.

### khác

- query and filter contexts

## 2. Cách ES lưu trữ dữ liệu: kiểu dữ liệu là JSON Và lưu file JSON

- elasticsearch tìm kiếm trên `Document` -> thực hiện đánh index trên đó.(là 1 row )
- Quá trình `mapping` là các field sẽ có `type` - >quyết định nó sẽ được search như thế nào.

- Document:

  - index_id
  - required_field: type field -> mapping data
  - meta-field

- dựa trên: `apache lucene`

--------------------------- Security autoconfiguration information ------------------------------

Authentication and authorization are enabled.
TLS for the transport and HTTP layers is enabled and configured.

The generated password for the elastic built-in superuser is : hH0\*P1S-t3MXqtFRYl3s

If this node should join an existing cluster, you can reconfigure this with
'/usr/share/elasticsearch/bin/elasticsearch-reconfigure-node --enrollment-token <token-here>'
after creating an enrollment token on your existing cluster.

You can complete the following actions at any time:

Reset the password of the elastic built-in superuser with
'/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic'.
eyJ2ZXIiOiI4LjguMCIsImFkciI6WyIxOTIuMTY4LjEuMTA6OTIwMCJdLCJmZ3IiOiIyMWJkODgwNjJlZDc0ODQwZjM0NDkwNTIyZWZhN2JlNzgwMTNlM2UxODg2ZWJlNzE1MjkwMjI2NmJmNmY2NWNlIiwia2V5IjoiZTVNNmdZZ0JDbjNVNzhTYVZOd1E6c2kyX2xuY0dRbzJPME1BWWJYUHVHZyJ9

Generate an enrollment token for Kibana instances with
'/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana'.

Generate an enrollment token for Elasticsearch nodes with
'/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s node'.

---

### NOT starting on installation, please execute the following statements to configure elasticsearch service to start automatically using systemd

sudo systemctl daemon-reload
sudo systemctl enable elasticsearch.service

### You can start elasticsearch service by executing

sudo systemctl start elasticsearch.service
